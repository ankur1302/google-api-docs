const GoogleDocsModel = require("../google-docs/google-docs.model");

const getMyFiles = async (req) => {
  try {
    const files = await GoogleDocsModel.find({ user: req.user._id }).lean();
    return req.sendResponse(200, {
        files,
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = getMyFiles;
