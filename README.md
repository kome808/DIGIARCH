# 現代化數位典藏後台管理系統 (DIGIARCH)

[![Release](https://img.shields.io/badge/version-1.0--RC-blue.svg)](https://github.com/kome808/DIGIARCH)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

一個功能完整的數位典藏管理系統，專為博物館、圖書館、檔案館等文化機構設計。

## ✨ 系統特色

- 🎨 **現代化介面設計** - 採用淺色主題與玻璃擬態設計
- 🤖 **AI 智慧輔助** - 整合 AI 編目建議與 OCR 文字辨識
- 📦 **完整工作流程** - 從徵集、入庫、數位化到編目的完整流程管理
- 🔍 **強大搜尋功能** - 全域整合查詢，支援多維度篩選
- 📊 **數據視覺化** - 即時統計與報表分析
- 🌐 **CMS 內容管理** - 前台網站內容管理系統

## 🚀 核心功能模組

### M01 - 整合查詢
全域搜尋引擎，支援跨全宗、圖片、案件、OCR 內容查詢，提供多維度篩選功能。

### M02 - 首頁與待辦
儀表板與任務管理中心，即時顯示系統統計、待辦事項與通知。

### M03 - 徵集審議作業
捐贈與購案審核流程管理，包含完整的評估與決議工作流程。

### M04 - 全宗架構管理
檔案階層結構管理，支援樹狀導覽與批次匯入。

### M05 - 入庫作業管理
實體館藏點收與入庫流程，含庫房管理與異常追蹤。

### M06 - 數位化作業
數位化流程管理，包含檔案上傳、格式轉換、QC 檢核等完整流程。

### M07 - 詮釋資料維護
館藏詮釋資料編輯與維護，整合 AI 編目建議與 OCR 文字辨識。

### M08 - 網站管理 (CMS)
前台網站內容管理，提供視覺化區塊編輯器。

### M09 - 提借(閱)作業
實體提借與數位閱覽申請管理，支援多階段審核流程。

### M10 - 資料統計及報表
系統運行指標與數據分析，提供視覺化圖表與審計日誌。

### M11 - 系統設定
系統管理與配置，包含使用者管理、角色權限與 AI 服務配置。

## 🛠️ 技術架構

- **前端框架**: Vanilla JavaScript (ES Modules)
- **建置工具**: Vite 5.x
- **樣式設計**: CSS3 (Glassmorphism)
- **字體系統**: Inter + Noto Sans TC
- **路由管理**: Hash Router
- **模組化**: ES6 Modules

## 📦 安裝與執行

### 環境需求

- Node.js 16.x 或更高版本
- npm 或 yarn

### 安裝步驟

```bash
# 克隆儲存庫
git clone https://github.com/kome808/DIGIARCH.git

# 進入專案目錄
cd DIGIARCH

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開發伺服器將在 `http://localhost:5173/` 啟動。

### 建置生產版本

```bash
npm run build
```

建置後的檔案將輸出到 `dist/` 目錄。

### 預覽生產版本

```bash
npm run preview
```

## 📁 專案結構

```
DIGIARCH/
├── index.html              # 主頁面
├── package.json            # 專案配置
├── .gitignore             # Git 忽略檔案
├── README.md              # 專案說明
└── src/
    ├── main.js            # 應用程式入口
    ├── router.js          # 路由管理
    ├── style.css          # 全域樣式
    ├── components/        # 共用組件
    │   ├── AppShell.js   # 應用程式外殼
    │   └── Modal.js      # 彈窗組件
    └── modules/           # 功能模組
        ├── M01_search.js          # 整合查詢
        ├── M02_dashboard.js       # 首頁與待辦
        ├── M03_acquisition.js     # 徵集審議
        ├── M04_hierarchy.js       # 全宗架構
        ├── M05_ingest.js          # 入庫作業
        ├── M06_digitization.js    # 數位化
        ├── M07_metadata.js        # 詮釋資料
        ├── M08_cms.js             # 網站管理
        ├── M09_circulation.js     # 提借閱
        ├── M10_analytics.js       # 統計報表
        └── M11_settings.js        # 系統設定
```

## 🎯 開發狀態

- ✅ 所有核心模組已完成
- ✅ AI 編目建議功能
- ✅ OCR 文字辨識整合
- ✅ 完整工作流程管理
- ✅ 響應式設計
- 🔄 持續優化中

## 📝 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 👥 貢獻

歡迎提交 Issue 或 Pull Request！

## 📧 聯絡方式

如有任何問題或建議，請透過 GitHub Issues 聯繫我們。

---

**現代化數位典藏後台管理系統** - 讓文化資產管理更智慧、更高效
