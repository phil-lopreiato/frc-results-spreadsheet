/**
 * Script to hit The Blue Alliance APIv2, read an event's matches, and write them to a Google Drive Spreadsheet
 */

// Creates a new Google Sheet called <event_key>_matches
// Writes the ID of the sheet to Script properties
function createSheet() {
  var props = PropertiesService.getScriptProperties();
  var event_key = props.getProperty("event_key");
  var matches = fetchEventMatches(event_key);
  var spreadsheet = SpreadsheetApp.create(event_key+"_matches");

  props.setProperty("sheet_id", spreadsheet.getId());
}

function getAndWriteMatches() {
  var props = PropertiesService.getScriptProperties();
  var sheet_id = props.getProperty("sheet_id");
  var event_key = props.getProperty("event_key");

  var sheet = SpreadsheetApp.openById(sheet_id).getSheets()[0];
  var matches = fetchEventMatches(props, event_key);

  writeHeaderRow(sheet);
  writeMatches(sheet, matches);
}

/* Write header row:
    match_key, red1, red2, red3, blue1, blue2, blue3, redScore, blueScore
 */
function writeHeaderRow(sheet) {
  var row = ["Match Key", "Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3", "Red Score", "Blue Score"];
  var range = sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
  range.setValues([row]);
}

function writeMatches(sheet, matches) {
  var data = [];
  for (var i = 0; i < matches.length; i++) {
    Logger.log(match);
    var match = matches[i];
    var red_alliance = match["alliances"]["red"];
    var blue_alliance = match["alliances"]["blue"];
    var row = [match["key"], red_alliance["teams"][0], red_alliance["teams"][1], red_alliance["teams"][2], blue_alliance["teams"][0], blue_alliance["teams"][1], blue_alliance["teams"][2], red_alliance["score"], blue_alliance["score"]];
    data.push(row);
  }

  var range = sheet.getRange(2, 1, matches.length, 9);
  range.setValues(data);
}

// Fetches event key from TBA API v2 from script prop event_key
function fetchEventMatches(props, event_key) {
  var app_id = props.getProperty("tba_app_id");
  var headers = {"X-TBA-App-Id": app_id};

  var result = UrlFetchApp.fetch("https://www.thebluealliance.com/api/v2/event/"+event_key+"/matches", {"headers" : headers});
  return JSON.parse(result.getContentText());
}
