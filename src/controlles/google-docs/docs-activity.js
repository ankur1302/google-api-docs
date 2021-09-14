const { google } = require("googleapis");
const GoogleDocsModel = require("./google-docs.model");
const getOauth2Client = require('../../lib/google-drive')

const getActivity = async (req) => {
  try {
    if (!req.user.refreshToken) {
      return req.sendResponse(422, {
        message: 'You have to connect google account'
      })
    }
    const drive = getOauth2Client(req.user.refreshToken);
    const googleDocs = await GoogleDocsModel.findOne({
      googleId: req.params.id,
    });
    if (!googleDocs) {
      return req.sendResponse(422, {
        message: "Requested doc not found",
      });
    }

    const response = await drive.revisions.list({
        fileId: req.params.id,
        fields: 'revisions'
    })
    return req.sendResponse(200, {
      message: "Activity fetch successfully",
      data: response.data,
    });
  } catch (error) {
    return req.sendResponse(500, error);
  }
};

module.exports = getActivity;
