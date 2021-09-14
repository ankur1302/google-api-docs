const Joi = require('joi');

const updateSchema = {
  refreshToken: Joi.string().required().label('Refresh Token'),
};

module.exports = {
  updateSchema,
};
