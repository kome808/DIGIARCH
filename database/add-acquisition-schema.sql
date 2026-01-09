-- =====================================================
-- 數位典藏系統 - 徵集審議作業模組
-- =====================================================

-- 1. 建立徵集案件表 (acquisition_cases)
CREATE TABLE IF NOT EXISTS digi.acquisition_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_no VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category VARCHAR(50) DEFAULT '捐贈', -- 捐贈, 移撥, 價購, 徵集
    status VARCHAR(50) DEFAULT '草稿', -- 草稿, 評估中, 審議中, 已核定, 已撤案, 已結案
    applicant VARCHAR(255),
    owner_contact TEXT,
    in_charge VARCHAR(255),
    description TEXT,
    target_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_acq_cases_no ON digi.acquisition_cases(case_no);
CREATE INDEX IF NOT EXISTS idx_acq_cases_status ON digi.acquisition_cases(status);

-- 2. 建立案件附件表 (acquisition_attachments)
CREATE TABLE IF NOT EXISTS digi.acquisition_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES digi.acquisition_cases(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50), -- 清單, 契約, 照片, 評議
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 啟用 RLS
ALTER TABLE digi.acquisition_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE digi.acquisition_attachments ENABLE ROW LEVEL SECURITY;

-- 4. 建立 RLS 政策 (允許所有人讀寫，供團隊快速開發階段使用)
CREATE POLICY "Allow all on acquisition_cases" ON digi.acquisition_cases FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on acquisition_attachments" ON digi.acquisition_attachments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 5. 授權
GRANT ALL ON TABLE digi.acquisition_cases TO anon, authenticated;
GRANT ALL ON TABLE digi.acquisition_attachments TO anon, authenticated;

-- 6. 插入謝里法案範例資料
INSERT INTO digi.acquisition_cases (case_no, title, category, status, applicant, in_charge, description)
VALUES (
    'ACQ-2026-001', 
    '謝里法檔案捐贈案', 
    '捐贈', 
    '評估中', 
    '謝里法家屬', 
    'UX開發小組', 
    '謝里法先生（1938-2022）為台灣當代藝術教父，捐贈內容包含藝術史手稿、錄音帶及罕見文獻。'
) ON CONFLICT (case_no) DO NOTHING;
