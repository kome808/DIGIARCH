# 數位典藏系統｜領域流程與狀態機

> **文件版本**：v1.0 | **最後更新**：2026-01-09  
> **基於規格**：[002-spec-flows-x-functions-case-xielifa.md](./002-spec-flows-x-functions-case-xielifa.md)、[003-spec-service-blueprint-xielifa.md](./003-spec-service-blueprint-xielifa.md)  
> **一致性規則**：模組名稱以 Canonical L1 為準

---

## 1. 流程總覽（謝里法案例）

依據服務藍圖，完整流程分為三大階段：

| 階段 | 涵蓋步驟 | 對應模組 |
|------|---------|---------|
| **捐贈/徵集審議** | 1-10 | 徵集審議作業、網站管理 |
| **館內作業** | 11-20 | 全宗架構、入庫管理、數位化、詮釋維護、系統設定、網站管理 |
| **前台服務** | 21-24 | 整合查詢、提借作業、統計報表 |

---

## 2. 徵集審議流程

### 2.1 流程圖

```mermaid
sequenceDiagram
    participant D as 捐贈人
    participant F as 前台/Email
    participant H as 承辦人員
    participant ACQ as 徵集審議作業
    participant EVAL as 評估人員
    participant COM as 審議委員
    participant FONDS as 全宗架構管理
    
    D->>F: 提出捐贈意向
    F->>H: 收件通知
    H->>ACQ: 新增案件、上傳清單
    ACQ->>ACQ: 建立流水號（名稱可空）
    
    Note over D,ACQ: 階段 3-5：物件點收與補件
    
    H->>EVAL: 分派評估
    EVAL->>ACQ: 整批評估＋逐件建議
    
    H->>COM: 安排審議會議
    COM->>ACQ: 逐件審議（通過/否決＋理由）
    H->>ACQ: 上傳契約（僅作參考）
    H->>ACQ: 標記案件完成
    
    ACQ->>FONDS: 移交審議通過物件
```

### 2.2 狀態機：AcquisitionCase

```mermaid
stateDiagram-v2
    [*] --> draft: 新增案件
    draft --> evaluating: 開始評估
    evaluating --> pending_review: 評估完成
    pending_review --> reviewed: 審議完成
    reviewed --> accepted: 通過
    reviewed --> rejected: 否決
    accepted --> completed: 取得作業完成
    rejected --> [*]
    completed --> [*]
```

### 2.3 狀態機：AcquisitionItem

```mermaid
stateDiagram-v2
    [*] --> pending: 建立
    pending --> recommended: 評估建議入庫
    pending --> not_recommended: 評估不建議
    recommended --> approved: 審議通過
    recommended --> rejected: 審議否決
    not_recommended --> rejected: 自動否決
    approved --> [*]: 移交全宗
    rejected --> [*]
```

### 2.4 資料流

| 步驟 | 輸入 | 處理 | 輸出 |
|------|------|------|------|
| 建立案件 | 捐贈清單 | 產生案件＋流水號 | AcquisitionCase, AcquisitionItem |
| 評估 | 物件清單 | 逐件評估 | evaluation_result |
| 審議 | 評估結果 | 逐件通過/否決 | review_result, rejection_reason |
| 完成 | 通過清單 | 鎖定清單 | 移交至 Item（全宗架構） |

---

## 3. 入庫＋保存修護流程

### 3.1 流程圖

```mermaid
sequenceDiagram
    participant FONDS as 全宗架構管理
    participant INTAKE as 入庫作業管理
    participant REPAIR as 保存修護
    participant SYS as 系統設定
    participant LOAN as 提借作業
    
    FONDS->>INTAKE: 移交物件清單
    INTAKE->>INTAKE: 點收、差異比對
    INTAKE->>INTAKE: 編碼/發號
    INTAKE->>INTAKE: 保存地登記
    INTAKE->>REPAIR: 登錄保存等級（1-4）
    
    alt 等級 = 3 或 4
        REPAIR->>SYS: 觸發限制規則
        SYS->>LOAN: 設定「不可外借」
        REPAIR->>REPAIR: 建立修護作業單
        REPAIR->>REPAIR: 送修/回收
        REPAIR->>REPAIR: 回寫、調整等級
    end
    
    INTAKE->>DIGI: 移交已入庫物件
```

### 3.2 狀態機：IntakeBatch

```mermaid
stateDiagram-v2
    [*] --> pending: 建立批次
    pending --> in_progress: 開始點收
    in_progress --> completed: 點收完成
    completed --> [*]
```

### 3.3 狀態機：RepairOrder

```mermaid
stateDiagram-v2
    [*] --> draft: 建立
    draft --> pending_approval: 送核（選配）
    draft --> in_progress: 直接進行
    pending_approval --> in_progress: 核准
    pending_approval --> draft: 退回
    in_progress --> pending_acceptance: 修護完成
    pending_acceptance --> completed: 驗收通過
    pending_acceptance --> in_progress: 驗收退回
    completed --> closed: 結案
    closed --> [*]
```

### 3.4 保存等級限制規則

| 等級 | 描述 | 實體外借 | 觸發動作 |
|------|------|---------|---------|
| 1 | 最佳 | ✅ 可 | - |
| 2 | 良好 | ✅ 可 | - |
| 3 | 需注意 | ❌ 不可 | 自動限制、建議修護 |
| 4 | 需修護 | ❌ 不可 | 強制限制、建議優先修護 |

---

## 4. 數位化流程

### 4.1 流程圖

```mermaid
sequenceDiagram
    participant INTAKE as 入庫管理
    participant DIGI as 數位化作業
    participant TRANS as 轉檔服務
    participant FILE as 檔案儲存
    participant META as 詮釋維護
    
    INTAKE->>DIGI: 建立數位化案件
    DIGI->>FILE: 上傳原始檔 (TIFF/PDF)
    DIGI->>TRANS: 觸發轉檔
    TRANS->>FILE: 產生縮圖（大/中/小）
    TRANS->>DIGI: 回寫狀態/解析度
    DIGI->>DIGI: QC 檢核
    
    alt QC 通過
        DIGI->>META: 進入待編目
    else QC 退回
        DIGI->>DIGI: 重新上傳/修正
    end
```

### 4.2 狀態機：DigiProject

```mermaid
stateDiagram-v2
    [*] --> draft: 建立案件
    draft --> in_progress: 開始作業
    in_progress --> qc_pending: 上傳完成
    qc_pending --> completed: QC 通過
    qc_pending --> in_progress: QC 退回
    completed --> [*]
```

### 4.3 狀態機：DigiTask（轉檔任務）

```mermaid
stateDiagram-v2
    [*] --> pending: 建立任務
    pending --> running: 開始執行
    running --> success: 完成
    running --> failed: 失敗
    failed --> pending: 重試
    success --> [*]
```

---

## 5. 編目與審核流程

### 5.1 流程圖

```mermaid
sequenceDiagram
    participant DIGI as 數位化作業
    participant META as 詮釋維護
    participant OCR as OCR 服務
    participant REV as 審核人員
    participant RAG as RAG 服務
    participant WEB as 網站管理
    
    DIGI->>META: 物件進入待編目
    META->>META: 選用 Schema/Template
    META->>OCR: 觸發 OCR（選配）
    OCR->>META: 回存文字
    META->>META: 人工編目
    META->>REV: 提交審核
    
    alt 審核通過
        REV->>META: 標記通過
        META->>RAG: 觸發向量索引
        META->>WEB: 物件可上架
    else 審核退回
        REV->>META: 標記退回＋意見
        META->>META: 修正後重新提交
    end
```

### 5.2 狀態機：ItemMetadata

```mermaid
stateDiagram-v2
    [*] --> draft: 開始編目
    draft --> pending_review: 提交審核
    pending_review --> approved: 審核通過
    pending_review --> rejected: 審核退回
    rejected --> draft: 修正後重編
    approved --> [*]: 可上架
```

### 5.3 審核版本追溯

每次審核退回/修正產生 `ItemMetadataHistory` 記錄：
- `diff`：JSON 格式的欄位差異
- `changed_by`：修改者
- `changed_at`：修改時間

---

## 6. RAG 索引流程

### 6.1 流程圖

```mermaid
sequenceDiagram
    participant META as 詮釋維護
    participant SYS as 系統設定
    participant RAG as RAG 服務
    participant VECTOR as 向量資料庫
    participant SEARCH as 前台搜尋
    
    META->>RAG: 編目完成 → 觸發索引
    RAG->>RAG: 產生 Embedding
    Note over RAG: 標題＋描述＋OCR文字
    RAG->>VECTOR: Upsert 向量
    
    alt 刪除/重建策略
        SYS->>RAG: 設定策略
        RAG->>VECTOR: Delete + Reindex
    end
    
    SEARCH->>RAG: 語意查詢
    RAG->>VECTOR: 向量相似度搜尋
    VECTOR->>RAG: 返回結果
    RAG->>SEARCH: 返回物件列表
```

### 6.2 索引策略

| 策略 | 說明 | 使用時機 |
|------|------|---------|
| 增量更新 | 單筆 Upsert | 預設、編目完成時 |
| 批次更新 | 多筆 Upsert | 匯入完成時 |
| 全量重建 | Delete All + Reindex | Schema 變更、模型更換 |

---

## 7. 前台查詢＋提借流程

### 7.1 流程圖

```mermaid
sequenceDiagram
    participant U as 民眾/研究者
    participant FE as 前台網站
    participant SEARCH as 整合查詢
    participant ACCESS as 存取控制
    participant LOAN as 提借作業
    participant APPROVER as 簽核人員
    participant STATS as 統計報表
    
    U->>FE: 搜尋/瀏覽
    FE->>SEARCH: 查詢請求
    SEARCH->>ACCESS: 檢查可視權限
    ACCESS->>SEARCH: 返回可視欄位
    SEARCH->>FE: 返回結果
    FE->>STATS: 記錄點閱
    
    U->>FE: 提出提借申請
    FE->>LOAN: 建立案件
    LOAN->>ACCESS: 檢查可借閱
    
    alt 可借閱
        loop 多層簽核
            LOAN->>APPROVER: 送簽
            APPROVER->>LOAN: 決定
        end
        LOAN->>U: 通知結果
    else 不可借閱
        LOAN->>U: 告知限制
    end
```

### 7.2 狀態機：LoanRequest

```mermaid
stateDiagram-v2
    [*] --> submitted: 提交申請
    submitted --> under_review: 開始審查
    under_review --> approved: 核准
    under_review --> rejected: 駁回
    approved --> loaned: 出借
    loaned --> returned: 歸還
    returned --> closed: 結案
    rejected --> closed: 結案
    closed --> [*]
```

### 7.3 多層簽核配置

簽核流程由 `系統設定 → 工作流程設定` 配置，預設層級：

| 層級 | 角色 | 說明 |
|------|------|------|
| 1 | 承辦 | 初步審查 |
| 2 | 主管 | 單位主管 |
| 3 | 主秘 | 選配 |
| 4 | 副館長 | 選配 |
| 5 | 館長 | 最終核准 |

可依案件類型（實體/數位/影音）設定不同流程。

---

## 8. 服務藍圖對照表

### 8.1 捐贈/徵集階段（階段 1-10）

| 階段 | L1 使用者行為 | L4 Backstage 模組 | 資料異動 |
|------|-------------|------------------|---------|
| 1 | 得知徵集資訊 | 網站管理 | - |
| 2 | 提出捐贈意向 | 徵集審議作業 | 新增 AcquisitionCase |
| 3 | 文物運回 | 徵集審議作業 | 新增 AcquisitionItem（流水號） |
| 4 | 查詢進度 | 網站管理、徵集審議 | 讀取 Case/Item 狀態 |
| 5 | 補充資料 | 徵集審議作業 | 更新 Attachment 版本 |
| 6 | 等待評估 | 徵集審議作業 | 新增 AcquisitionEvaluation |
| 7 | 確認契約 | 徵集審議作業 | 更新 Attachment（契約） |
| 8 | 等待審議 | 徵集審議作業 | 新增 Meeting，更新 Item review_result |
| 9 | 確認範圍 | 徵集審議作業 | 鎖定通過清單 |
| 10 | 捐贈完成 | 徵集審議作業 | Case → completed |

### 8.2 館內作業階段（階段 11-20）

| 階段 | L1 使用者行為 | L4 Backstage 模組 | 資料異動 |
|------|-------------|------------------|---------|
| 11 | 建立全宗結構 | 全宗架構管理 | 新增 Fonds/Series/Folder/Item |
| 12 | 正式入庫 | 入庫作業管理 | 新增 IntakeBatch，Item.accession_no |
| 13 | 登錄保存等級 | 入庫→保存修護 | 新增 ConditionHistory |
| 14 | 觸發限制 | 系統設定、提借 | 更新 Item 限制旗標 |
| 15 | 建立修護案 | 入庫→保存修護 | 新增 RepairOrder, RepairOrderItem |
| 16 | 送修/修護中 | 入庫→保存修護 | 新增 CustodyLog |
| 17 | 修護完成 | 入庫→保存修護 | 更新 RepairOrder, ConditionHistory |
| 18 | 數位化 | 數位化作業 | 新增 DigiProject, File |
| 19 | 編目/審核 | 詮釋維護 | 新增 ItemMetadata |
| 20 | 權利/索引/上架 | 系統設定、詮釋維護、網站管理 | 新增 Rights, Vector, 發布 |

### 8.3 前台服務階段（階段 21-24）

| 階段 | L1 使用者行為 | L4 Backstage 模組 | 資料異動 |
|------|-------------|------------------|---------|
| 21 | 搜尋瀏覽 | 整合查詢 | 讀取 + StatsSnapshot |
| 22 | 提借申請 | 提借作業 | 新增 LoanRequest |
| 23 | 審查回覆 | 提借作業 | 新增 LoanApproval |
| 24 | 使用統計 | 統計報表 | 更新 StatsSnapshot |

---

## 9. 一致性規則摘要

| 規則 | 說明 |
|------|------|
| **Canonical L1 命名** | 後台模組名稱統一使用文件 1 定義 |
| **契約 ≠ 最終權利** | 契約僅作參考，權利狀態需獨立盤點 |
| **流水號可空名** | 徵集階段名稱可空，需有唯一流水號 |
| **等級限制自動觸發** | 等級 3/4 自動設定不可外借 |
| **版本差異追溯** | Metadata 變更保留 diff history |
| **審核多層簽核** | 簽核流程可配置，依案件類型不同 |

---

> **相關文件**：
> - [010-architecture-overview.md](./010-architecture-overview.md)
> - [020-data-model.md](./020-data-model.md)
