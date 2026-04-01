/* GitTrend Tracker - Google Sheets Webhook */

// Replace with your actual Apps Script Web App URL
const WEBHOOK_URL = "";

function log(event, data = {}) {
  if (!WEBHOOK_URL) return;

  const payload = {
    event: event,
    page: window.location.pathname,
    language_filter: data.language_filter || "",
    time_range: data.time_range || "",
    userAgent: navigator.userAgent,
    browserLang: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  // Use sendBeacon for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon(WEBHOOK_URL, JSON.stringify(payload));
  } else {
    fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      keepalive: true
    }).catch(() => {});
  }
}

function logPageVisit() {
  log("page_visit");
}

function logRepoClick(repoName) {
  log("repo_click", { repo: repoName });
}

window.SheetsWebhook = { log, logPageVisit, logRepoClick };

/*
  Google Apps Script code (deploy as Web App):

  function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Visits");
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.event || "page_visit",
      data.page || "/",
      data.language_filter || "",
      data.time_range || "",
      data.userAgent || "",
      data.browserLang || "",
      data.timezone || ""
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" })
    ).setMimeType(ContentService.MimeType.JSON);
  }
*/
