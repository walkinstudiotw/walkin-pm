# WalkIn Studio PM

WalkIn Studio 的案件管理工具。單檔 HTML，Firebase 後端，無需安裝。

## 線上版本

https://walkinstudiotw.github.io/walkin-pm/

## 功能

- 📋 **案件管理** — 客戶 / 工作項目庫 / 報價單
- 🧾 **Invoice** — 月底自動結算、PDF 寄送（Apps Script Webhook）
- 💵 **金流追蹤** — 70/30 分潤、付款狀態
- 🪄 **AI 輔助** — 對話 / 截圖辨識自動填入案件
- 📥 **大量匯入** — 從 Excel/Google Sheets 貼上

## 寄信後端

`appscript.gs` 是 Google Apps Script Web App 程式碼，部署後填入「⚙️ 設定 → Apps Script Web App URL」即可透過 Gmail 寄送 Invoice。
