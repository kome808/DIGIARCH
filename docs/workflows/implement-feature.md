---
description: Implement-Feature 開發流程 - 依計畫實作功能並確保規範一致性
---

# Implement-Feature 開發流程

在 Plan-First 流程完成且用戶確認後，依序完成以下步驟。

## 前置條件

- [x] 已完成 plan-first 流程
- [x] Implementation Plan 已獲用戶確認
- [x] 必讀文件皆已閱讀

---

## 步驟

### 1. 建立檔案結構

依 Implementation Plan 建立所需檔案：

```
src/
├── adapters/supabase/     # Supabase Adapter
├── repositories/          # Repository 層
├── services/              # Service 層
├── components/            # UI 元件
├── pages/                 # 頁面
└── types/                 # TypeScript 型別
```

// turbo
### 2. 實作 Repository 層

依序實作：

1. 定義 TypeScript 型別（對應 docs/020-data-model.md）
2. 實作 Repository class
3. 回傳格式必須為 `{ data, error }`
4. 查詢使用 `.maybeSingle()` 而非 `.single()`

// turbo
### 3. 實作 Service 層

1. 封裝業務邏輯
2. 呼叫 Repository 而非直接呼叫 Supabase
3. 處理錯誤與邊界情況

// turbo
### 4. 實作 UI 元件

1. 呼叫 Service 層取得資料
2. 使用 Design Tokens / CSS 變數（不得使用任意值）
3. 不得寫死假資料
4. 不得直接呼叫 Supabase client

### 5. 對照 rules.md 檢查

逐條對照 `docs/spac/rules.md` 檢查程式碼：

- [ ] 無 `import.meta.env`
- [ ] 無 `kv_store` 類表格
- [ ] CRUD 未放 Edge Functions
- [ ] 無寫死假資料（`const data = [...]`）
- [ ] 查詢使用 `.maybeSingle()`
- [ ] Schema 名稱使用變數
- [ ] 無 `shadcn/ui` 元件
- [ ] 無 Tailwind 任意值

### 6. 對照 plan 文件檢查

對照 `docs/plan/[模組名稱].md` 檢查：

- [ ] 所有需求皆已實作
- [ ] 狀態機流轉正確
- [ ] 資料欄位一致
- [ ] UI 元件符合規劃

**若有差異**：
1. 先更新文件（說明變更原因）
2. 再調整實作

// turbo
### 7. 撰寫測試

1. Service 層單元測試（必須）
2. 關鍵 Repository 單元測試（必須）
3. 關鍵流程整合測試或手動測試步驟

```bash
npm run test
```

### 8. 執行完整檢查

// turbo
```bash
# TypeScript 類型檢查
npm run type-check

# Linting
npm run lint

# 測試
npm run test
```

### 9. 更新 Walkthrough

在 `.gemini/antigravity/brain/[conversation-id]/walkthrough.md` 記錄：

- 完成的功能
- 測試結果
- 截圖（如有 UI 變更）

### 10. 通知用戶

使用 notify_user 工具通知用戶：

- 實作完成摘要
- 測試結果
- 是否有任何文件更新

---

## 禁制事項快速檢查

```typescript
// ❌ 禁止
import.meta.env.VITE_SUPABASE_URL
const data = [{ id: 1, name: 'test' }]
.single()
className="bg-blue-500 p-4"
import { Button } from 'shadcn/ui'

// ✅ 正確
localStorage.getItem('supabase_url')
const { data, error } = await repository.findAll()
.maybeSingle()
className="bg-[var(--color-primary-500)] p-[var(--spacing-4)]"
```

---

## 完成標準

- [ ] 程式碼符合 Implementation Plan
- [ ] 通過 rules.md 所有檢查項
- [ ] 通過 plan 文件所有檢查項
- [ ] 測試通過
- [ ] TypeScript 無錯誤
- [ ] Lint 無錯誤
- [ ] Walkthrough 已更新
- [ ] 用戶已通知
