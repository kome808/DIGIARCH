import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '../../config/supabaseConfig';

let clientInstance: SupabaseClient<any, "public", any> | null = null;

export function getSupabaseClient(): SupabaseClient<any, "public", any> {
    if (clientInstance) {
        return clientInstance;
    }

    const config = getSupabaseConfig();
    if (!config) {
        throw new Error('Supabase 連線設定尚未配置，請先至系統設定頁面設定。');
    }

    // 強制轉型以避免 schema string vs "public" error
    clientInstance = createClient(config.url, config.anonKey, {
        db: {
            schema: config.schemaName || 'digi',
        },
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    }) as SupabaseClient<any, "public", any>;

    return clientInstance;
}

export function resetSupabaseClient(): void {
    clientInstance = null;
}

export function isSupabaseConfigured(): boolean {
    return getSupabaseConfig() !== null;
}
