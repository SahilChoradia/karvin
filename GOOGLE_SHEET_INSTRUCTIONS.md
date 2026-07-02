# Google Sheets Integration Setup Guide

Follow these steps to connect the website's contact forms to a Google Sheet:

## 1. Create the Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a blank sheet.
2. Change the sheet name to `Karvin Leads` (or your preferred name).

## 2. Add the Google Apps Script
1. Inside the Google Sheet, go to **Extensions** -> **Apps Script**.
2. Delete any code in the editor and paste the following script:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevent concurrent write anomalies
  
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add header row if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Company",
        "Phone",
        "Email",
        "City",
        "State",
        "Business Type",
        "Requirement",
        "Product",
        "Budget",
        "Timeline",
        "Message",
        "Source",
        "IP",
        "User Agent",
        "Status"
      ]);
      
      // Style header row (bold & grey background)
      sheet.getRange(1, 1, 1, 17)
           .setFontWeight("bold")
           .setBackground("#f3f3f3");
    }
    
    // Append the lead data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.company || "",
      "'" + (data.phone || ""), // Prefix with ' to force phone as text format
      data.email || "",
      data.city || "",
      data.state || "",
      data.businessType || "",
      data.requirement || "",
      data.product || "",
      data.budget || "",
      data.timeline || "",
      data.message || "",
      data.source || "",
      data.ip || "Unknown",
      data.userAgent || "Unknown",
      data.status || "New Lead"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "success": true, "message": "Lead written successfully." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Handle CORS OPTIONS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 3. Deploy the Web App
1. Click **Deploy** (top right) -> **New deployment**.
2. Click the gear icon (**Select type**) and choose **Web app**.
3. Set the configuration details:
   - **Description**: `Karvin Website Lead Hook`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` (this is critical so the website server can submit data).
4. Click **Deploy**.
5. Grant permissions if prompted (log in and click "Advanced" -> "Go to Untitled project (unsafe)" to authorize).
6. Copy the **Web App URL** provided (it ends in `/exec`).

## 4. Add the Environment Variable
In your website's root folder, create or open `.env.local` and add:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXX-YOUR-DEPLOYMENT-ID-XXXXX/exec
```

Replace `https://script.google.com/macros/s/XXXXX...` with the exact Web App URL you copied in the previous step.
