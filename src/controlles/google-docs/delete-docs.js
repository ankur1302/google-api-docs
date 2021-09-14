const { google } = require("googleapis");
const GoogleDocsModel = require("./google-docs.model");
const getOauth2Client = require('../../lib/google-drive')

const deleteDocs = async (req) => {
  try {
    if (!req.user.refreshToken) {
      return req.sendResponse(422, {
        message: 'You have to connect google account'
      })
    }
    const drive = getOauth2Client(req.user.refreshToken);
    const googleDocs = await GoogleDocsModel.findOne({
      googleId: req.params.id,
      user: req.user._id
    });
    if (!googleDocs) {
      return req.sendResponse(422, {
        message: "Requested doc not found",
      });
    }
    const response = await drive.files.delete({
        fileId: req.params.id,
    })
    await GoogleDocsModel.findByIdAndDelete({ _id: googleDocs._id});
    return req.sendResponse(200, {
      message: "Document delete successfully"
    });
  } catch (error) {
    return req.sendResponse(500, error);
  }
};

module.exports = deleteDocs;
