const jwt = require('jsonwebtoken');

const jwtSignUser = (user) => {
  const ONE_WEEK = process.env.TOKEN_EXPIRE_IN;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK,
  });
};

const jwtSignUserRefreshToken = (user) => jwt.sign(user, process.env.JWT_SECRET);

module.exports = {
  jwtSignUser,
  jwtSignUserRefreshToken,
};
