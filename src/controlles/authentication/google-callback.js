const { getOauh2ClientRef } = require("../../lib/google-drive");

const googleCallback = async (req, res) => {
  const code = req.query.code;
  if (code) {
    const response = await getOauh2ClientRef().oauth2Client.getToken(code);
    res.render("success", { token: response.tokens.refresh_token });
  }
};

module.exports = googleCallback;
