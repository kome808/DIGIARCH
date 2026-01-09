import { createClient } from '@supabase/supabase-js';
import { ConfigRepository } from '../repositories/ConfigRepository';
import { SupabaseConfig } from '../types/config';
import { saveSupabaseConfigToLocal, getSupabaseConfig as getLocalConfig } from '../config/supabaseConfig';
import { CONFIG_KEYS } from '../config/constants';
import { encryptValue } from '../config/encryption';
import { resetSupabaseClient } from '../adapters/supabase/client';

export class ConfigService {
    private repository: ConfigRepository;

    constructor() {
        this.repository = new ConfigRepository();
    }

    /**
     * 測試 Supabase 連線是否有效
     */
    async testConnection(config: SupabaseConfig): Promise<boolean> {
        try {
            const tempClient = createClient(config.url, config.anonKey, {
                db: { schema: config.schemaName || 'public' },
                auth: { persistSession: false },
            });

            // 嘗試進行一個簡單的查詢來驗證連線
            // 這裡假設如果連線正確，至少能連上 Supabase 服務
            // 查詢一個不存在的表通常會返回錯誤，但如果是連線錯誤 (401/404) 則表示 Config 有誤
            // 更好的方式是查詢 system_config 或 users (但可能此時尚無權限)
            // 若是全新專案， system_config 表應該存在
            const { error } = await tempClient
                .from('system_config')
                .select('count', { count: 'exact', head: true });

            // 如果是 401 Unauthorized 或 400 Bad Request (URL 錯誤)，則連線失敗
            // 如果是 404 (表不存在) 但有回應，則連線成功 (只是表沒建)
            // 但為了簡單起見，我們認定如果沒有 serious connection error 就過
            if (error && (error.code === 'PGRST301' || error.message.includes('FetchError') || error.code === '401')) {
                console.error('Test connection failed:', error);
                return false;
            }

            return true;
        } catch (e) {
            console.error('Test connection exception:', e);
            return false;
        }
    }

    /**
     * 儲存設定
     * 1. 存入 localStorage
     * 2. 重置 Client
     * 3. (若連線成功) 同步備份到 system_config 表
     */
    async saveConfig(config: SupabaseConfig): Promise<void> {
        // 1. Save to Local
        saveSupabaseConfigToLocal(config);

        // 2. Reset Singleton
        resetSupabaseClient();

        // 3. Try to backup to DB (Best effort)
        try {
            if (await this.testConnection(config)) {
                // 加密 Anon Key
                const encryptedKey = await encryptValue(config.anonKey);

                await this.repository.upsert(CONFIG_KEYS.SUPABASE_URL, config.url, false);
                await this.repository.upsert(CONFIG_KEYS.SUPABASE_ANON_KEY, encryptedKey, true); // 加密
                await this.repository.upsert(CONFIG_KEYS.SUPABASE_SCHEMA, config.schemaName, false);
            }
        } catch (e) {
            console.warn('Backup config to DB failed, but local config saved.', e);
        }
    }

    /**
     * 取得當前設定
     */
    getCurrentConfig(): SupabaseConfig | null {
        return getLocalConfig();
    }
}
