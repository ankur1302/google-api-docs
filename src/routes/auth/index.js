const express = require('express');

const router = express.Router();

const validator = require('../../lib/validator/validator');
const authController = require('../../controlles/authentication');
const schemas = require('../../controlles/authentication/schema');

router.post('/signup', validator(schemas.signupSchema), authController.signup);
router.post('/login', validator(schemas.loginSchema), authController.login);
router.get('/google', authController.googleToken);
router.get('/google/callback', authController.googleCallback);
module.exports = router;
