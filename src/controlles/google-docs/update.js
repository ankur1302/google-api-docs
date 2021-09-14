const stream = require("stream");
const GoogleDocsModel = require("./google-docs.model");
const getOauth2Client = require("../../lib/google-drive");

const updateFile = async (req) => {
  try {
    if (!req.user.refreshToken) {
      return req.sendResponse(422, {
        message: "You have to connect google account",
      });
    }
    const googleDocs = await GoogleDocsModel.findOne({
      googleId: req.params.id,
      user: req.user._id,
    });
    if (!googleDocs) {
      return req.sendResponse(422, {
        message: "Requested doc not found",
      });
    }
    const drive = getOauth2Client(req.user.refreshToken);
    const response = await drive.files.export(
      {
        fileId: req.params.id,
        mimeType: "text/plain",
      },
      { responseType: "stream" }
    );

    let buf = [];
    response.data.on("data", (e) => buf.push(e));
    response.data.on("end", async () => {
      const content = "\n" + req.body.content;
      buf.push(Buffer.from(content, "binary"));
      const bufferStream = new stream.PassThrough();
      bufferStream.end(Uint8Array.from(Buffer.concat(buf)));
      var media = {
        body: bufferStream,
      };
      await drive.files.update({
        fileId: req.params.id,
        resource: {},
        media: media,
        fields: "id",
      });
    });
    return req.sendResponse(200, {
      message: "File updated successfully",
    });
  } catch (error) {
    return req.sendResponse(500, error);
  }
};

module.exports = updateFile;
