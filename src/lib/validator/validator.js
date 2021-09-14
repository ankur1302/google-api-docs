
/**
* @name ./lib/validator/validator.js
* @author jaydipsinh Vaghela <jaydip@sixberries.com>
*
* @version 0.0.1
*/

// External module dependencies
const Joi = require('joi');
const _ = require('lodash');
/**
* A per route validation option
*
* @param {Object|Array} validations The validations to perform on the specified route
* @param {Object} options A list of options for validations.
* @return {Function}
*
* @public
*/

module.exports = function joiValidate(validations) {
  /**
  * The middleware that handles the route validation
  *
  * @param {Object} req The express request object
  * @param {Object} res The express result object
  * @param {Function} next The function to call upon validation completion
  *
  * @private
  */
  function validate(req, res, next) {
    // Get all of our req data items
    req.body = _.isEmpty(req.body) ? (req.fields ? req.fields : req.body) : req.body;
    const body = req.body;

    const { error } = Joi.validate(body, validations);
    if (error) {
      if (error.details && error.details.length) {
        res.status(422).send({ error: error.details[0].message });
      } else {
        res.status(422).send({ error: error.message });
      }
    } else {
      next();
    }
  }

  return validate;
};
