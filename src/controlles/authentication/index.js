const asyncMiddleware = require('../../lib/async-middleware');

module.exports = {
  signup: asyncMiddleware(require('./signup')),
  login: asyncMiddleware(require('./login')),
  googleToken: asyncMiddleware(require('./get-google-token')),
  googleCallback: asyncMiddleware(require('./google-callback')),
};
