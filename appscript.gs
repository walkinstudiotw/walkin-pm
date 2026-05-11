// ═════════════════════════════════════════════════════════════
// WalkIn Studio · pm_manager.html — Invoice Webhook (Apps Script)
// ─────────────────────────────────────────────────────────────
// 部署方式：
// 1) 到 https://script.google.com 新增空白專案
// 2) 把這份檔案內容貼入 Code.gs
// 3) 點「部署 → 新增部署」→ 類型「Web 應用程式」
//    - 執行身分：你自己（會用你的 Gmail 寄信）
//    - 存取權限：「任何人」（任何人都能 POST，但因為 URL 不公開，等同私密）
// 4) 部署後複製「Web 應用程式 URL」（結尾是 /exec）
// 5) 貼到 pm_manager.html 的 ⚙️ 設定 → 「Apps Script Web App URL」
// 6) 在 Invoice 編輯頁點「✉ 寄出」即可
//
// 收到的 payload：
// { to, cc, subject, body, pdfBase64, filename }
// ═════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const { to, cc, subject, body, pdfBase64, filename } = payload;

    if (!to) throw new Error('Missing "to" recipient');
    if (!pdfBase64) throw new Error('Missing PDF data');

    // Decode base64 PDF
    const pdfBlob = Utilities.newBlob(
      Utilities.base64Decode(pdfBase64),
      'application/pdf',
      filename || 'Invoice.pdf'
    );

    GmailApp.sendEmail(to, subject || 'Invoice', body || '', {
      cc: cc || '',
      attachments: [pdfBlob],
      name: 'WalkIn Studio'
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, sentAt: new Date().toISOString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 健康檢查（GET 此 URL 看到「OK」表示部署成功）
function doGet() {
  return ContentService
    .createTextOutput('OK · WalkIn Studio Invoice Webhook')
    .setMimeType(ContentService.MimeType.TEXT);
}
