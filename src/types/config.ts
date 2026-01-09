export interface SupabaseConfig {
  url: string;
  anonKey: string;
  schemaName: string;
}

export interface SystemConfigRecord {
  id: string;
  config_key: string;
  config_value: string | null;
  description: string | null;
  is_encrypted: boolean;
  updated_by: string | null;
  updated_at: string;
}

export interface ConfigResult<T> {
  data: T | null;
  error: Error | null;
}
