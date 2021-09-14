const UserModel = require('./user.model');

const edit = async (req) => {
  const existingUser = await UserModel.findOne({ _id: req.user._id });
  if (!existingUser) {
    return req.sendResponse(404, 'User not exists.');
  }

  await UserModel.findOneAndUpdate({ _id: req.user._id }, { $set: req.body });
  return req.sendResponse(201, 'User updated');
};

module.exports = edit;
