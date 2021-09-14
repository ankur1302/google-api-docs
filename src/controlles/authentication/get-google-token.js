const { getOauh2ClientRef } = require('../../lib/google-drive')

const googleToken = async (req, res) => {
    var url = getOauh2ClientRef().oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: getOauh2ClientRef().SCOPES,
      });
      res.render("index", { url: url });
};

module.exports = googleToken;
