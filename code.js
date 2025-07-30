// Apps Script backend (Code.gs)

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getUserEmail() {
  return Session.getActiveUser().getEmail();
}

function getErrorsForUser(week) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Audit Log");
  const data = sheet.getDataRange().getValues();

  const email = Session.getActiveUser().getEmail();
  const headers = data[0];
  const rows = data.slice(1);

  const WEEK_COL = headers.indexOf("Week");
  const EMAIL_COL = headers.indexOf("Email");
  const BID_COL = headers.indexOf("BID");
  const ERROR_COL = headers.indexOf("Error");
  const COMMENTS_COL = headers.indexOf("Comments");
  const CORRECTIVE_COL = headers.indexOf("Corrective measures");
  const STATUS_COL = headers.indexOf("Feedback sent?");
  const ACCEPT_COL = 11; // Column L (0-indexed)

  const results = rows.filter(row => row[EMAIL_COL] === email && row[WEEK_COL] === week && row[STATUS_COL] === "Yes")
                      .map((row, index) => ({
                        bid: row[BID_COL],
                        error: row[ERROR_COL],
                        comments: row[COMMENTS_COL],
                        corrective: row[CORRECTIVE_COL],
                        status: row[STATUS_COL],
                        accepted: row[ACCEPT_COL]
                      }));

  return results;
}

function updateErrorStatus(bid, newStatus) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Audit Log");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const BID_COL = headers.indexOf("BID");
  const ACCEPT_COL = 11; // Column L (0-indexed)

  for (let i = 0; i < rows.length; i++) {
    if (rows[i][BID_COL] === bid) {
      const value = newStatus === "Accepted" ? "Yes" : "No";
      sheet.getRange(i + 2, ACCEPT_COL + 1).setValue(value);
      break;
    }
  }
  return true;
}
