const express = require("express");
const router = express.Router();
const passport = require("passport");

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client).then(x => {console.log(x)});
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// @route GET api/googlesheets/
// @desc Get accountability points for a specific user
// @access Private

async function listAccountabilities(auth, callback, name) {
  const sheets = google.sheets({version: 'v4', auth});
  let rows;
  sheets.spreadsheets.values.get({
    spreadsheetId: '1VF6uVZt60tmwv5ObtFXHUoWrkT9co3fGAkbX4CVJg00',
    range: 'Total!A2:E',
}, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    rows = res.data.values;
    if (rows.length) {
      // Print columns A and E, which correspond to indices 0 and 4.
      // console.log("From listAccountabilities:", rows);
      for (var i = 0; i < rows.length; i++) {
          if (rows[i][0].toLowerCase() == name.toLowerCase()) {
              callback(rows[i])
              return;
          }
      }
      callback("No data found.")
  } else {
      console.log('No data found.');
    }
    });
    console.log(rows);
    return rows;
}



router.get(
  "/",
  //passport.authenticate("jwt", { session: false }),
   (req, res) => {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      const credentials = JSON.parse(content)
      // Authorize a client with credentials, then call the Google Sheets API.
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);
      // Check if we have previously stored a token.
       fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        listAccountabilities(oAuth2Client, (x => {res.send(x)}), req.body.users.name);
      });
    });
  }
);

router.post(
  "/",
  //passport.authenticate("jwt", { session: false }),
   (req, res) => {
    console.log(req.body.users.name)
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      const credentials = JSON.parse(content)
      // Authorize a client with credentials, then call the Google Sheets API.
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);
      // Check if we have previously stored a token.
       fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        listAccountabilities(oAuth2Client, (x => {res.send(x)}), "Eric");
      });
    });
  }
);

module.exports = router;
