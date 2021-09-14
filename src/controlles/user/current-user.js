const moment = require('moment');

const UserModel = require('./user.model');
const { jwtSignUser } = require('../authentication/helper');

const currentUser = async (req) => {
  try {
    const userJson = await UserModel.findOne({ email: req.user.email }).select('-password, -__v').lean();
    return req.sendResponse(200, {
      user: userJson,
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = currentUser;
