# Vercel 部署指南

## 📋 部署前準備

### 1. 確認專案已推送至 GitHub
✅ 已完成 - https://github.com/kome808/DIGIARCH

### 2. 確認 Supabase 已設定完成
- ✅ 已建立 `digi` Schema
- ✅ 已建立 `system_config` 資料表
- ✅ 已設定 RLS 政策

---

## 🚀 Vercel 部署步驟

### 步驟 1: 登入 Vercel
1. 前往 https://vercel.com
2. 點擊右上角 **Sign Up** 或 **Log In**
3. 選擇 **Continue with GitHub** (建議使用 GitHub 帳號登入)
4. 授權 Vercel 存取您的 GitHub 帳號

### 步驟 2: 匯入專案
1. 登入後，點擊 **Add New...** → **Project**
2. 在 **Import Git Repository** 區域找到 `kome808/DIGIARCH`
3. 點擊 **Import**

### 步驟 3: 設定專案
Vercel 會自動偵測到這是一個 Vite 專案，並自動填入以下設定：

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

✅ 這些設定都是正確的，**不需要修改**。

### 步驟 4: 部署
1. 確認設定無誤後，點擊 **Deploy**
2. 等待部署完成（通常需要 1-3 分鐘）
3. 部署成功後，Vercel 會提供一個網址，例如：
   ```
   https://digiarch.vercel.app
   ```

---

## ⚙️ 部署後設定

### 設定 Supabase 連線
部署完成後，您需要在線上系統設定 Supabase 連線：

1. 前往您的 Vercel 部署網址
2. 進入「系統設定 > 連線設定」
3. 輸入以下資訊：
   - **Supabase URL**: `https://your-project.supabase.co`
   - **Anon Key**: (從 Supabase Dashboard 取得)
   - **Schema Name**: `digi`
4. 點擊「測試連線」確認設定
5. 儲存設定

> ⚠️ **重要提醒**：
> - 連線資訊會儲存在瀏覽器的 localStorage
> - 每個使用者/瀏覽器都需要個別設定
> - 建議在 Supabase 中建立專用的 Service Role Key 供生產環境使用

---

## 🔄 自動部署設定

Vercel 已自動設定 CI/CD：

- ✅ **主分支自動部署**：每次推送到 `main` 分支時自動部署
- ✅ **預覽部署**：Pull Request 會自動建立預覽環境
- ✅ **即時日誌**：可在 Vercel Dashboard 查看部署日誌

### 更新部署
當您需要更新線上版本時：

```bash
# 1. 提交變更
git add .
git commit -m "feat: 新增功能描述"

# 2. 推送至 GitHub
git push origin main

# 3. Vercel 會自動偵測並重新部署
```

---

## 🎯 自訂網域 (可選)

如果您有自己的網域，可以在 Vercel 設定：

1. 進入 Vercel Dashboard
2. 選擇您的專案
3. 前往 **Settings** → **Domains**
4. 點擊 **Add Domain**
5. 輸入您的網域並按照指示設定 DNS

---

## 📊 監控與分析

Vercel 提供以下功能：

- **Analytics**: 流量分析與效能監控
- **Logs**: 即時部署與執行日誌
- **Speed Insights**: 網站效能分析

可在 Vercel Dashboard 中查看這些資訊。

---

## ❓ 常見問題

### Q: 部署後頁面空白？
A: 檢查瀏覽器 Console 是否有錯誤訊息，通常是路由設定問題。

### Q: 如何回滾到舊版本？
A: 在 Vercel Dashboard 的 **Deployments** 頁面，找到舊版本並點擊 **Promote to Production**。

### Q: 如何設定環境變數？
A: 本專案不使用環境變數，所有設定透過 UI 管理。

---

## ✅ 部署檢查清單

- [ ] 登入 Vercel
- [ ] 匯入 GitHub Repository
- [ ] 確認 Build 設定
- [ ] 點擊 Deploy
- [ ] 等待部署完成
- [ ] 測試線上網址
- [ ] 設定 Supabase 連線
- [ ] 測試基本功能

完成！🎉
