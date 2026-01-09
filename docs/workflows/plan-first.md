---
description: Plan-First 開發流程 - 在寫程式碼前必須先完成規劃與確認
---

# Plan-First 開發流程

在開始任何功能開發前，必須依序完成以下步驟。

## 步驟

### 1. 閱讀必讀文件

依序閱讀以下文件：

```
1. guidelines/Product_Context.md（系統背景與核心資料流）
2. docs/spac/rules.md（全域業務規則與嚴格禁制事項）
3. docs/plan/[模組名稱].md（本次任務需求）
```

// turbo
### 2. 確認模組名稱

確認本次任務對應的 Canonical L1 模組名稱（參照 docs/001-spec-modules-backend-menu.md）。

### 3. 產出 Implementation Plan

在 `.gemini/antigravity/brain/[conversation-id]/implementation_plan.md` 產出實作計畫，包含：

- 目標描述
- 涉及的實體與欄位
- 涉及的 Repository/Service
- UI 元件清單
- 狀態機變更（如有）
- 測試計畫

### 4. 檢查文件完整性

確認必讀文件是否完整描述本需求的關鍵規則與流程。

**如果有缺漏**：
- 先向用戶提問
- 必要時協助更新 `docs/plan/[模組名稱].md`

### 5. 確認 PRIME DIRECTIVE

對照 `docs/dev-handbook-antigravity.md` 確認以下禁制事項：

- [ ] 無需使用 `import.meta.env`
- [ ] 無需使用 `kv_store` 類表格
- [ ] CRUD 不需放 Edge Functions
- [ ] 無需寫死假資料
- [ ] 查詢將使用 `.maybeSingle()`
- [ ] Schema 名稱將使用變數
- [ ] 資料存取將透過 Repository/Adapter

### 6. 等待用戶確認

使用 notify_user 工具將 Implementation Plan 送交用戶審閱。

**用戶確認後**，才可進入 implement-feature 流程。

---

## 文件優先順序提醒

```
1. guidelines/Product_Context.md    ← 最高
2. docs/spac/rules.md
3. docs/plan/[模組名稱].md
4. 程式碼實作                        ← 最低
```

當規則衝突時，上層文件優先。

---

## 完成標準

- [ ] 已閱讀所有必讀文件
- [ ] 已產出 Implementation Plan
- [ ] 已確認文件完整性（或已更新）
- [ ] 已確認無任何禁制事項衝突
- [ ] 已獲得用戶確認
