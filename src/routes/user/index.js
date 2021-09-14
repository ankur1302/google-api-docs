const express = require('express');

const router = express.Router();

const user = require('../../controlles/user');
const validator = require('../../lib/validator/validator');
const schemas = require('../../controlles/user/schema');

router.get('/me/', user.currentUser);
router.patch('/me/', validator(schemas.updateSchema) , user.edit);
router.get('/my-files/', user.getMyFiles);
router.get('/shared-files/', user.getSharedFiles);


module.exports = router;
