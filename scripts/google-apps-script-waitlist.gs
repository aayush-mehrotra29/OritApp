/**
 * Paste this into Extensions > Apps Script on the waitlist Google Sheet,
 * then deploy a new Web App version after making changes here.
 *
 * Set SECRET below to match WAITLIST_WEBHOOK_SECRET in the Next.js app's
 * environment variables — this stops random people from POSTing rows into
 * your sheet if they ever find the URL.
 */

var SECRET = "72584ddd742155b74e86170cc10a15f26506fecbe9da4ad6"; // must match WAITLIST_WEBHOOK_SECRET in .env.local
var SHEET_NAME = "Waitlist"; // tab name to append rows to; falls back to the active sheet

var EMAIL_RE = /^[a-z0-9_%+-]+(?:\.[a-z0-9_%+-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return jsonOutput({ ok: false, error: "unauthorized" });
    }

    var email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    var parts = email.split("@");
    if (email.length > 254 || parts[0].length > 64 || (parts[1] && parts[1].length > 253) || !EMAIL_RE.test(email)) {
      return jsonOutput({ ok: false, error: "invalid_email" });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
      var lastRow = sheet.getLastRow();
      if (lastRow > 0) {
        var existingEmails = sheet.getRange(1, 2, lastRow, 1).getDisplayValues();
        for (var i = 0; i < existingEmails.length; i++) {
          if (String(existingEmails[i][0]).trim().toLowerCase() === email) {
            return jsonOutput({ ok: true, alreadyJoined: true });
          }
        }
      }

      // The only stored signup fields are the time of entry and normalized email.
      sheet.appendRow([new Date(), email]);
      SpreadsheetApp.flush();

      return jsonOutput({ ok: true, alreadyJoined: false });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    console.error("Waitlist signup failed", err);
    return jsonOutput({ ok: false, error: "storage_error" });
  }
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
