const { google } = require("googleapis");
const stream = require("stream");
const GoogleDocsModel = require("./google-docs.model");
const getOauth2Client = require('../../lib/google-drive')

const createFlie = async (req) => {
  try {
    if (!req.user.refreshToken) {
      return req.sendResponse(422, {
        message: 'You have to connect google account'
      })
    }
    const drive = getOauth2Client(req.user.refreshToken);
    var bufferStream = new stream.PassThrough();
    bufferStream.end(Uint8Array.from(Buffer.from(req.body.content, "binary")));

    const response = await drive.files.create({
      requestBody: {
        name: req.body.name,
        mimeType: "application/vnd.google-apps.document",
      },
      media: {
        mimeType: "text/plain",
        body: bufferStream,
      },
    });
    const googleDocs = new GoogleDocsModel({
      user: req.user._id,
      fileName: response.data.name,
      googleId: response.data.id,
    });
    await googleDocs.save();
    return req.sendResponse(200, {
      message: "File created successfully",
    });
  } catch (error) {
    return req.sendResponse(500, error);
  }
};

module.exports = createFlie;
