/**
 * Allows for catching errors in async/await middleware in express
 * @param {callback} fn
 * @return {function}
 */
module.exports = function asyncMiddleware(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => req.sendResponse(500, err));
  };
};
