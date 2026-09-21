/**
 * Paste this into Extensions > Apps Script on the Google Sheet you want
 * waitlist signups to land in, then deploy it as a Web App (see
 * README section "Waitlist → Google Sheet setup" for the exact steps).
 *
 * Set SECRET below to match WAITLIST_WEBHOOK_SECRET in the Next.js app's
 * environment variables — this stops random people from POSTing rows into
 * your sheet if they ever find the URL.
 */

var SECRET = "72584ddd742155b74e86170cc10a15f26506fecbe9da4ad6"; // must match WAITLIST_WEBHOOK_SECRET in .env.local
var SHEET_NAME = "Waitlist"; // tab name to append rows to; falls back to the active sheet

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return jsonOutput({ ok: false, error: "unauthorized" });
    }

    var email = String(data.email || "").trim();
    if (!EMAIL_RE.test(email)) {
      return jsonOutput({ ok: false, error: "invalid_email" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    sheet.appendRow([
      new Date(),
      email,
      data.source || "",
      data.userAgent || "",
    ]);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
