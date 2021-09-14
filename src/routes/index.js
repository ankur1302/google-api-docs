
const authRoutes = require('./auth');
const userRoutes = require('./user');
const googleDocsRoute = require('./google-docs');

const { sendResponse } = require('../lib/responseHandler');
const isAuthenticated = require('../lib/auth/isAuthenticated');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('API running...!!!');
  });

  // add response handle method for all api endpoint and default bind req, res and next
  // to the response handler for later use.
  app.use((req, res, next) => {
    req.sendResponse = sendResponse.bind(null, req, res, next);
    next();
  });

  app.use('/', authRoutes);
  
  // validate user authentication
  app.use(isAuthenticated);
  app.use('/users', userRoutes);
  app.use('/google-docs', googleDocsRoute);

  // catch 404 and forward to error handler
  app.use((req, res) => {
    console.log(`Not Found. Accessing route - ${req.path} For ${req.method}`);
    res.status(404).send({ error: `Not Found. Accessing route - ${req.path} For ${req.method}` });
  });
};
