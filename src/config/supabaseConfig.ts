import { SupabaseConfig } from '../types/config';

const STORAGE_KEY = 'digiarch_supabase_config';

export function getSupabaseConfig(): SupabaseConfig | null {
    // 1. 優先從環境變數讀取 (團隊共用模式)
    const env = (import.meta as any).env || {};
    const envUrl = env.VITE_SUPABASE_URL;
    const envKey = env.VITE_SUPABASE_ANON_KEY;
    const envSchema = env.VITE_SUPABASE_SCHEMA || 'digi';

    if (envUrl && envKey) {
        return {
            url: envUrl,
            anonKey: envKey,
            schemaName: envSchema,
            schema: envSchema
        };
    }

    // 2. 其次從 localStorage 讀取 (個人手動模式)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.url && parsed.anonKey) {
                return {
                    ...parsed,
                    schema: parsed.schema || parsed.schemaName || 'digi'
                } as SupabaseConfig;
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    return null;
}

export function saveSupabaseConfigToLocal(config: SupabaseConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearSupabaseConfigFromLocal(): void {
    localStorage.removeItem(STORAGE_KEY);
}
