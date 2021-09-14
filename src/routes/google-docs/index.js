const express = require('express');

const router = express.Router();

const googleDocs = require('../../controlles/google-docs');
const validator = require('../../lib/validator/validator');
const schemas = require('../../controlles/google-docs/schema');

router.post('/', validator(schemas.createSchema), googleDocs.create);
router.patch('/:id', validator(schemas.updateSchema), googleDocs.update);
router.patch('/permission/:id', googleDocs.givePermission);
router.get('/activity/:id', googleDocs.getActivity);
router.delete('/:id', googleDocs.deleteDocs);

module.exports = router;
