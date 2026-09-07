const SPREADSHEET_ID = '1M-e5MPpH8huH469eGzrfFpyKFUErJq1d6TJFHzJbi30';

function doGet() {
  return json_({ ok: true, service: 'PayScale Hub Sales Tracker API' });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  if (body.action === 'addCustomer') {
    ss.getSheetByName('Customers').appendRow([
      body.customerId || Utilities.getUuid(),
      body.company || '',
      body.person || '',
      body.phone || '',
      body.rep || '',
      body.status || 'شركة محتملة',
      body.note || '',
      new Date()
    ]);
  }
  if (body.action === 'addFollowup') {
    ss.getSheetByName('Followups').appendRow([
      body.followupId || Utilities.getUuid(),
      body.customerId || '',
      body.type || '',
      body.followDate || '',
      body.nextVisit || '',
      body.note || '',
      body.rep || ''
    ]);
  }
  return json_({ ok: true });
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}