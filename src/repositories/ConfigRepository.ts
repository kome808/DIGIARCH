import { getSupabaseClient } from '../adapters/supabase/client';
import { SystemConfigRecord, ConfigResult } from '../types/config';

const TABLE_NAME = 'system_config';

export class ConfigRepository {
    /**
     * 根據 Key 查詢設定
     */
    async findByKey(key: string): Promise<ConfigResult<SystemConfigRecord>> {
        try {
            const client = getSupabaseClient();
            const { data, error } = await client
                .from(TABLE_NAME)
                .select('*')
                .eq('config_key', key)
                .maybeSingle(); // ✅ 遵守 Prime Directive: maybeSingle

            if (error) {
                // PostgrestError convert to Error
                return { data: null, error: new Error(error.message) };
            }
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as Error };
        }
    }

    /**
     * 更新或插入設定
     */
    async upsert(
        key: string,
        value: string,
        isEncrypted: boolean = false,
        updatedBy?: string
    ): Promise<ConfigResult<SystemConfigRecord>> {
        try {
            const client = getSupabaseClient();
            const payload: Partial<SystemConfigRecord> = {
                config_key: key,
                config_value: value,
                is_encrypted: isEncrypted,
                updated_at: new Date().toISOString(),
            };

            if (updatedBy) {
                payload.updated_by = updatedBy;
            }

            const { data, error } = await client
                .from(TABLE_NAME)
                .upsert(payload, {
                    onConflict: 'config_key',
                })
                .select()
                .maybeSingle(); // ✅ 遵守 Prime Directive: maybeSingle

            if (error) {
                return { data: null, error: new Error(error.message) };
            }
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as Error };
        }
    }
}
