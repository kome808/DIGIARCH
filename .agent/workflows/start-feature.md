---
description: 自動化建立開發分支並同步最新程式
---

當使用者說「我要開發 XXX 模組」或「開始新任務：XXX」時，請執行以下步驟：

// turbo-all
1. 執行 `git pull origin main` 確保本地代碼是最新的。
2. 根據任務名稱建立新分支：`git checkout -b feature/[任務名稱]`。
3. 建立該模組的專屬目錄：`mkdir -p src/pages/[任務名稱]`。
4. 回報給使用者：「分支 feature/[任務名稱] 已建立，您可以開始開發了！」
