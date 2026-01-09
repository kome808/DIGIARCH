-- =====================================================
-- 數位典藏系統 - Supabase Schema 與資料表建立指令
-- Schema Name: digi
-- =====================================================

-- 1. 建立 digi Schema
CREATE SCHEMA IF NOT EXISTS digi;

-- 2. 設定 Search Path (讓 Supabase 優先使用 digi schema)
ALTER DATABASE postgres SET search_path TO digi, public;

-- =====================================================
-- 3. 建立系統設定表 (system_config)
-- =====================================================
CREATE TABLE IF NOT EXISTS digi.system_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key VARCHAR(255) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    is_encrypted BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_system_config_key ON digi.system_config(config_key);

-- 插入初始設定 (可選)
INSERT INTO digi.system_config (config_key, config_value, is_encrypted, updated_by)
VALUES 
    ('system_name', '數位典藏管理系統', FALSE, 'system'),
    ('system_version', '1.0.0', FALSE, 'system')
ON CONFLICT (config_key) DO NOTHING;

-- =====================================================
-- 4. 啟用 Row Level Security (RLS)
-- =====================================================
ALTER TABLE digi.system_config ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. 建立 RLS 政策
-- =====================================================

-- 政策 1: 允許 anon 角色讀取 (使用 Anon Key 時)
CREATE POLICY "Allow anon users to read system_config"
ON digi.system_config
FOR SELECT
TO anon
USING (true);

-- 政策 2: 允許 anon 角色寫入 (使用 Anon Key 時)
CREATE POLICY "Allow anon users to write system_config"
ON digi.system_config
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- 政策 3: 允許 authenticated 用戶讀取 (已登入用戶)
CREATE POLICY "Allow authenticated users to read system_config"
ON digi.system_config
FOR SELECT
TO authenticated
USING (true);

-- 政策 4: 允許 authenticated 用戶寫入 (已登入用戶)
CREATE POLICY "Allow authenticated users to write system_config"
ON digi.system_config
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- 6. 授予權限給 authenticated 與 anon 角色
-- =====================================================
GRANT USAGE ON SCHEMA digi TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA digi TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA digi TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA digi TO anon, authenticated;

-- 設定未來建立的物件也自動授權
ALTER DEFAULT PRIVILEGES IN SCHEMA digi
GRANT ALL ON TABLES TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA digi
GRANT ALL ON SEQUENCES TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA digi
GRANT ALL ON FUNCTIONS TO anon, authenticated;

-- =====================================================
-- 完成！
-- =====================================================
-- 執行完畢後，您的 Supabase 專案將擁有：
-- 1. digi Schema
-- 2. system_config 資料表 (用於儲存系統設定)
-- 3. 完整的 RLS 政策 (支援 anon 與 authenticated 角色)
-- 4. 完整的權限設定
--
-- 接下來您可以在前端系統設定頁面輸入：
-- - Supabase URL: https://your-project.supabase.co
-- - Anon Key: (從 Supabase Dashboard 取得)
-- - Schema Name: digi
--
-- ⚠️ 安全提醒：
-- 目前的 RLS 政策允許所有人讀寫 system_config。
-- 在生產環境中，建議根據實際需求調整政策，例如：
-- - 限制只有特定用戶可以寫入
-- - 加入更細緻的權限控制
-- =====================================================
