# FRC Match Results Spreadsheet Creator
A Google Apps Script that uses The Blue Alliance API to create a spreadsheet containing match results.

## Dependencies:
 - [node-google-apps-script](https://github.com/danthareja/node-google-apps-script) to create the Google Script from this repository. It's optional, you can also just copy/paste the files

## Basic Setup
 1. [Create a new Apps Script project](https://github.com/danthareja/node-google-apps-script#32-a-new-apps-script-project) and initialize gapps locally.
 2. [Upload the files](https://github.com/danthareja/node-google-apps-script#5-upload-new-files) to the project
 3. Set up the project variables in the web script editor, which you can access from [script.google.com](http://script.google.com). Open the dialog by going File -> Project Properties -> Script Properties. Add the following key/value pairs: `tba_app_id`, your TBA API App Id (see [TBA API Docs](http://www.thebluealliance.com/apidocs)), and `event_key`, the TBA event key of the event you wish to import (you can find all events on [this page](http://www.thebluealliance.com/events) and get the key from the URL of the event page).
 4. In the Web Editor, select the `createSheet` function on the toolbar and hit the run arrow (once) to create a new spreadsheet to use.
 5. Now, select the `getAndWriteMatches` function and run that. You should be able to open the newly created sheet (named `<event_key>_matches` in the root of your Google Drive) and see the match data!

## Automatic Updates
After you have performed the basic config, you can set up a "trigger" to automatically update the results. Go to Resources -> Current Project Triggers and create a new trigger. Run `getAndWriteMatches` every 5 minutes.
