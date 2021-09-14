const asyncMiddleware = require('../../lib/async-middleware');

module.exports = {
  create: asyncMiddleware(require('./create')),
  update: asyncMiddleware(require('./update')),
  givePermission: asyncMiddleware(require('./give-permission')),
  getActivity: asyncMiddleware(require('./docs-activity')),
  deleteDocs: asyncMiddleware(require('./delete-docs')),
};
