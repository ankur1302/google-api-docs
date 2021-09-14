const Joi = require('joi');

const createSchema = {
  name: Joi.string().required(),
  content: Joi.string().required()
};

const updateSchema = {
  content: Joi.string().required()
};

module.exports = {
  createSchema,
  updateSchema
};
