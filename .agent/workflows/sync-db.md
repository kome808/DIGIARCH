---
description: 自動化同步資料庫變更需求 (主導者專用)
---

當主導者說「同步資料庫」或「執行 SQL 請求」時，請執行以下步驟：

1. 檢查 `database/migrations/ready-to-apply/` 目錄下是否有任何 `.sql` 檔案。
2. 如果有，讀取所有檔案內容，並將它們合併成一段完整的 SQL 指令碼。
3. 將合併後的內容顯示給主導者，並提示：「請將以下 SQL 複製並貼上到 Supabase SQL Editor 執行。」
4. 詢問主導者是否已執行成功。
5. 若成功，執行 `mv database/migrations/ready-to-apply/*.sql database/migrations/applied/`（將檔案移至已執行區）。
6. 將變更同步併入 `database/setup-digi-schema.sql` (選填，由 AI 協助合併)。
