const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

const SCOPES =
  "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";

const getOauh2ClientRef = () => {
    return { oauth2Client, SCOPES };
}

const getOauth2Client = (refreshToken) => {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })
    return drive;
}

module.exports = { 
    getOauth2Client,
    getOauh2ClientRef
};

