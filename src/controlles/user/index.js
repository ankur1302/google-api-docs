const asyncMiddleware = require('../../lib/async-middleware');

module.exports = {
  currentUser: asyncMiddleware(require('./current-user')),
  getMyFiles: asyncMiddleware(require('./get-my-files')),
  getSharedFiles: asyncMiddleware(require('./get-shared-files')),
  edit: asyncMiddleware(require('./edit')),
};
