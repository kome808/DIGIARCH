# 數位典藏系統 - 團隊協同合作指南

本文件旨在規範本專案（DIGIARCH）開發團隊的協作流程。團隊由 1 位專案主導者與 2 位 UX 設計師組成，利用 Antigravity (AI) 與 GitHub 進行高效協作。

---

## 👥 團隊角色與分工

### 1. 專案主導者 (Project Lead) - @kome808
*   **系統架構管理**：主導後台框架、資料庫 Schema (`digi`)、安全性 (RLS) 與全域樣式。
*   **技術審查 (Review)**：合併設計師的編碼請求，確保程式碼符合專案規範。
*   **部署管理**：管理 Vercel 部署設定與 Supabase 連線資訊。
*   **工作分配**：定義模組開發順序與規格說明。

### 2. UX 設計師 (UX Designers)
*   **模組功能開發**：負責特定模組（如「徵集審議作業」、「全宗架構管理」等）的 UI 與前端邏輯實作。
*   **AI 指令優化**：利用 Antigravity 快速產出符合設計規格的 React 元件。
*   **視覺校準**：確保開發出的頁面百分之百符合 Vuexy 風格與 Design Tokens。

---

## 🛠️ 開發工具與環境

*   **AI 助手**: Antigravity (負責產出程式碼、修改錯誤)
*   **版本控制**: GitHub (https://github.com/kome808/DIGIARCH)
*   **資料庫**: Supabase (Schema 統一使用 `digi`)
*   **部署平台**: Vercel (CI/CD 自動同步 main 分支)

---

## 🌿 Git 分支策略

為了維持系統穩定，我們採用 **Feature Branch** 流程：

1.  **main**: 穩定版本。任何 push 會觸發 Vercel 生產環境更新。**禁止直接在 main 進行實驗性修改。**
2.  **feature/xxx**: 功能分支（例如 `feature/collection-module`）。設計師在分支上作業。

### 工作流範例：
1.  設計師從 `main` 拉出新分支：`git checkout -b feature/module-name`
2.  在 Antigravity 中開發模組。
3.  提交變更：`git commit -m "feat: 完成徵集案件列表頁面"`
4.  推送到 GitHub：`git push origin feature/module-name`
5.  在 GitHub 建立 **Pull Request (PR)** 給主導者。
6.  主導者完成 Review 後合併至 `main`。

---

## 🤖 Antigravity AI 使用建議

為了讓 AI 產出的程式碼品質一致，請設計師遵守以下提示規則：

### 當建立新模組時：
> 「請協助開發『XXX 模組』。請遵循本專案目前的 Vuexy 設計風格，並使用 `src/styles/globals.css` 中的 Design Tokens。所有圖示請使用 `lucide-react`。」

### 當進行資料存取時：
> 「請依照本專案的規律，建立對應的 Repository 與 Service 層。資料表位於 `digi` schema 下，請確保 Repository 方法回傳 `{ data, error }` 並處理錯誤。」

---

## 🎨 視覺開發規範 (Vuexy Style)

1.  **字體**: 統一使用 Montserrat。
2.  **色彩**: 主要動作使用 `--color-primary` (`#7367F0`)。
3.  **容器**: 列表與表單應封裝在 `bg-white` 的卡片中，帶有細微陰影與邊框。
4.  **按鈕**: 使用系統定義的樣式，主按鈕需有 `shadow-sm` 並在 hover 時有陰影加深效果。

---

## 💾 資料庫作業須知

1.  所有新建立的資料表必須位於 `digi` Schema 之下。
2.  必須為每個新表設定 RLS 政策（至少包含 `anon` 與 `authenticated` 角色）。
3.  更新 Schema 後，請同步更新 `database/setup-digi-schema.sql`，以便其他團隊成員同步環境。

---

## ✅ 完成檢查清單 (Definition of Done)

*   [ ] 頁面在瀏覽器預覽符合 Vuexy 設計稿。
*   [ ] 頁面使用 Lucide 圖示。
*   [ ] 列表或連結與 React Router 路由正確串接。
*   [ ] 資料存取透過 Service 層處理。
*   [ ] 完成 `npm run build` 確認無 TypeScript 錯誤。
*   [ ] 程式碼已推送至 GitHub。

---

**凌網科技 UX 部門 - 數位典藏系統開發團隊**  
*Update: 2026.01.09*
