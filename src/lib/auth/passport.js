/**
 *  passport middleware which can call on every request to validate token based on
 *  last seen time stored in Redis server. default jwt expiration was ignore by config
 *  and implemented own logic for validate token time - JD
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const moment = require('moment');

const UserModel = require('../../controlles/user/user.model');

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: true,
    passReqToCallback: true,
  },
  (async (req, jwtPayload, done) => {
    try {
      const user = await UserModel.findOne({ _id: jwtPayload._id });
      if (!user) {
        return done('User not exists.', false);
      }
      return done(null, user);
    } catch (err) {
      return done('Error while checking authentication.', false);
    }
  })),
);

module.exports = null;
