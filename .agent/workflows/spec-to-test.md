---
description: 依據規格書自動生成並執行測試案例
---

# /spec-to-test 工作流程

此工作流會讀取指定模組的規格書，自動生成 Playwright 測試程式，並執行測試。

## 使用方式

```
/spec-to-test [模組名稱]
```

例如：`/spec-to-test acquisition-case-create`

---

## 執行步驟

### 1. 讀取規格書

讀取 `docs/specs/[模組名稱]-spec.md` 檔案，解析其中的 **Section 7: 測試案例**。

### 2. 確認測試檔案位置

測試檔案應位於：`tests/[模組名稱].spec.ts`

若檔案不存在，AI 將依據規格書自動生成測試程式。

### 3. 生成測試程式

依據規格書中的測試案例格式，AI 會自動產生對應的 Playwright 測試程式：

| 規格書欄位 | Playwright 對應 |
|------------|-----------------|
| 測試類型 | `test.describe()` 分組 |
| 前置條件 | `test.beforeEach()` 或開頭步驟 |
| 操作步驟 | `page.goto()`, `page.click()`, `page.fill()` |
| 預期結果 | `expect(...).toXxx()` 斷言 |
| 對應規則 | 測試檔案註解 |

### 4. 執行測試

// turbo
```bash
npm run test -- tests/[模組名稱].spec.ts
```

### 5. 檢視報告

若測試失敗，執行以下指令查看詳細報告：

```bash
npm run test:report
```

---

## 測試命名規範

- 測試檔案：`tests/[模組]/[功能].spec.ts`
- 測試名稱：`TC-XXX: [簡述]`

## 範例輸出

```typescript
test.describe('徵集案件新增', () => {
  test('TC-001: 成功新增案件', async ({ page }) => {
    await page.goto('/admin/acquisition/create');
    await page.fill('input[name="title"]', '自動化測試案件');
    await page.selectOption('select[name="category"]', '捐贈');
    await page.click('button:has-text("儲存")');
    await expect(page.locator('.toast-success')).toContainText('成功');
  });
});
```

---

## 注意事項

1. **前置條件**：若測試需要登入狀態，AI 會在 `beforeEach` 中加入登入步驟或使用 Storage State。
2. **選擇器策略**：優先使用 `data-testid`、`role`、`aria-label`，避免依賴 CSS class。
3. **等待策略**：使用 `waitForSelector` 或 Playwright 自動等待機制，避免硬等待 (`page.waitForTimeout`)。
