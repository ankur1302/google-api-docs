const Joi = require('joi');

const signupSchema = {
  email: Joi.string().email().required().label('Email'),
  firstName: Joi.string().required().label('First name'),
  lastName: Joi.string().required().label('Last name'),
  password: Joi.string().min(5, 'utf8').label('Password'),
  city: Joi.string().optional().label('City'),
  country: Joi.string().optional().label('Country'),
};

const loginSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};


module.exports = {
  signupSchema,
  loginSchema
};
