const moment = require('moment');
const UserModel = require('../user/user.model');
const { jwtSignUser, jwtSignUserRefreshToken } = require('./helper');

const signup = async (req, res) => {
  try {
    const email = new RegExp(['^', req.body.email, '$'].join(''), 'i');
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return req.sendResponse(422, 'Email exists in System');
    }
    const creatUser = new UserModel(req.body);
    userJson = await creatUser.save();
    delete userJson.password;
    delete userJson.createdAt;
    delete userJson.updatedAt;
    delete userJson.verificationCode;
    delete userJson.__v;

    const generatedToken = jwtSignUser({ _id: userJson._id, email: userJson.email });
    return req.sendResponse(200, {
      user: userJson,
      token: generatedToken,
      message: 'Awesome! User is registered in System',
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
};

module.exports = signup;
