const moment = require('moment');
const UserModel = require('../user/user.model');
const { jwtSignUser } = require('./helper');

async function login(req, res) {
  try {
    const { password } = req.body;
    const email = new RegExp(['^', req.body.email, '$'].join(''), 'i');
    const query = { email };
    const userJson = await UserModel.findOne(query).select('+password').lean();
    if (!userJson) {
      return req.sendResponse(422, 'Email ID not found in the System');
    }
    const isPasswordValid = await UserModel.comparePassword(password, userJson.password);
    if (!isPasswordValid) {
      return req.sendResponse(422, 'Password entered does not match with existing password');
    }

    delete userJson.password;
    delete userJson.createdAt;
    delete userJson.updatedAt;
    delete userJson.__v;

    const generatedToken = jwtSignUser({ _id: userJson._id, email: userJson.email });

    res.cookie('token', generatedToken);
    return req.sendResponse(200, {
      user: userJson,
      token: generatedToken,
      message: `Welcome ${userJson.firstName}`,
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = login;
