import { SupabaseConfig } from '../types/config';

const STORAGE_KEY = 'digiarch_supabase_config';

export function getSupabaseConfig(): SupabaseConfig | null {
    // 優先從 localStorage 讀取
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // 簡單驗證結構
            if (parsed.url && parsed.anonKey) {
                return parsed as SupabaseConfig;
            }
        } catch {
            // 解析失敗，清除
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
