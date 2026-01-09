# 數位典藏系統 - 專案開發規則

> **最後更新**：2026-01-09  
> **適用對象**：所有開發人員與 AI 助手

---

## 1. 模組命名與分工規範

### 1.1 Canonical L1 命名一致性

- 後台模組名稱**必須**與 [001-spec-modules-backend-menu.md](./001-spec-modules-backend-menu.md) 的 **Canonical L1** 定義完全一致
- **禁止**新增自創大模組名稱或重新定義模組邊界
- 若需調整模組定義，必須先更新 `001-spec-modules-backend-menu.md` 並經過設計審查

### 1.2 模組清單（唯一用詞）

| L1 模組 | 程式碼命名建議 |
|--------|---------------|
| 整合查詢 | `integrated-search` |
| 首頁與待辦 | `dashboard` |
| 徵集審議作業 | `acquisition` |
| 全宗架構管理 | `fonds-management` |
| 入庫作業管理 | `intake-management` |
| 數位化作業 | `digitization` |
| 詮釋資料維護 | `metadata` |
| 網站管理 | `website-management` |
| 提借(閱)作業 | `loan-management` |
| 資料統計及報表 | `statistics` |
| 系統設定 | `system-settings` |

---

## 2. 流程與畫面一致性規範

### 2.1 流程對照要求

實作任何流程或畫面時，**必須**對照以下文件：

1. [002-spec-flows-x-functions-case-xielifa.md](./002-spec-flows-x-functions-case-xielifa.md) - 「流程×功能對照表」
2. [003-spec-service-blueprint-xielifa.md](./003-spec-service-blueprint-xielifa.md) - 服務藍圖

### 2.2 檢查清單

實作前必須確認：

- [ ] 確認對應的服務藍圖階段（1-24）
- [ ] 確認 L4 Backstage 模組歸屬
- [ ] 確認沒有跳過任何必要步驟
- [ ] 確認沒有重複實作已存在的畫面/流程
- [ ] 確認輸入/輸出與上下游模組一致

### 2.3 狀態機驗證

所有涉及狀態流轉的功能，必須參照 [030-domain-flows.md](./030-domain-flows.md) 的狀態機定義：

- AcquisitionCase 狀態機
- AcquisitionItem 狀態機
- RepairOrder 狀態機
- DigiProject 狀態機
- ItemMetadata 狀態機
- LoanRequest 狀態機

---

## 3. 資料模型規範

### 3.1 Schema 遵循要求

資料存取**必須**遵守 [020-data-model.md](./020-data-model.md) 的資料模型定義。

### 3.2 Schema 變更流程

若需調整 schema：

1. **先更新** `docs/020-data-model.md` 文件
2. 在 PR/MR 中**明確註明**：
   - 變更的實體與欄位
   - 變更原因
   - 對其他模組的影響評估
3. 經過設計審查後方可實作
4. 同步更新相關的 migration 腳本

### 3.3 禁止事項

- ❌ 禁止在程式碼中使用未定義的欄位
- ❌ 禁止繞過 ORM 直接修改資料結構
- ❌ 禁止在不同模組間建立未文件化的資料依賴

---

## 4. 保存分級與提借限制規則

### 4.1 保存等級觸發規則

涉及保存分級、修護、權利與提借的邏輯時，**必須**同時檢查以下規則：

| 保存等級 | 描述 | 實體外借限制 | 系統動作 |
|---------|------|-------------|---------|
| 1 | 最佳 | ✅ 可外借 | 無 |
| 2 | 良好 | ✅ 可外借 | 無 |
| 3 | 需注意 | ❌ 禁止外借 | 自動設定限制旗標、建議修護 |
| 4 | 需修護 | ❌ 禁止外借 | 強制設定限制旗標、優先修護提醒 |

### 4.2 實作檢查點

```
入庫作業管理 → 保存修護 → 登錄等級
    ↓
    如果等級 >= 3
    ↓
    系統設定 → 觸發限制規則
    ↓
    提借(閱)作業 → 設定「不可外借」旗標
```

### 4.3 限制規則程式碼範例

```typescript
// 檢查物件是否可外借
function canLoanPhysical(item: Item): boolean {
  const latestCondition = getLatestConditionGrade(item.id);
  
  // 等級 3/4 禁止外借
  if (latestCondition.grade >= 3) {
    return false;
  }
  
  // 還需檢查權利設定
  const rights = getRights(item.id);
  if (rights.restrictions?.noPhysicalLoan) {
    return false;
  }
  
  return true;
}
```

---

## 5. 契約與權利設定規則

### 5.1 核心原則

> **契約只作權利盤點參考，最終權利狀態以權利設定模組為準。**

### 5.2 實作要求

1. **契約資料**存放於 `AcquisitionAttachment`（type = 'contract'），僅供參考
2. **最終權利狀態**必須在 `Rights` 表獨立設定
3. 前台顯示、下載、提借的權限判斷**只能**依據 `Rights` 表

### 5.3 UI 提示要求

在權利設定相關畫面，必須顯示以下警語：

```
⚠️ 契約內容僅供權利盤點參考，不代表最終權利狀態。
   請依據實際盤點結果設定權利狀態。
```

### 5.4 資料流示意

```
徵集審議作業
  └── AcquisitionAttachment (contract)  ← 僅參考
          ↓ 人工盤點
系統設定 → 權利設定
  └── Rights                            ← 最終權利狀態
          ↓
網站管理 / 提借作業                      ← 依據 Rights 判斷
```

---

## 6. PR/MR 檢查清單

提交程式碼前，請確認：

### 6.1 模組與命名

- [ ] 使用 Canonical L1 模組名稱
- [ ] 程式碼資料夾結構符合模組定義

### 6.2 流程一致性

- [ ] 對照「流程×功能對照表」確認覆蓋範圍
- [ ] 對照服務藍圖確認階段歸屬
- [ ] 狀態機實作符合 030-domain-flows.md

### 6.3 資料模型

- [ ] 使用的欄位皆定義於 020-data-model.md
- [ ] 若有 schema 變更，已更新文件並註明

### 6.4 業務規則

- [ ] 保存等級限制邏輯正確實作
- [ ] 權利判斷使用 Rights 表而非契約
- [ ] 相關 UI 包含必要警語

---

## 7. 參考文件索引

| 文件 | 用途 |
|------|------|
| [001-spec-modules-backend-menu.md](./001-spec-modules-backend-menu.md) | Canonical L1 模組定義 |
| [002-spec-flows-x-functions-case-xielifa.md](./002-spec-flows-x-functions-case-xielifa.md) | 流程×功能對照表 |
| [003-spec-service-blueprint-xielifa.md](./003-spec-service-blueprint-xielifa.md) | 服務藍圖 |
| [010-architecture-overview.md](./010-architecture-overview.md) | 系統架構 |
| [020-data-model.md](./020-data-model.md) | 資料模型 |
| [030-domain-flows.md](./030-domain-flows.md) | 流程與狀態機 |

---

> **違規處理**：不符合上述規則的程式碼將在 Code Review 階段被退回修正。
