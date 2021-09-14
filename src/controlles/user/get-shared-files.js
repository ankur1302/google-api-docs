const GoogleDocsModel = require("../google-docs/google-docs.model");

const getSharedFiles = async (req) => {
  try {
    const files = await GoogleDocsModel.find({ permissions: { $elemMatch: { emailAddress: req.user.email } } }).lean();
    return req.sendResponse(200, {
        files,
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = getSharedFiles;
