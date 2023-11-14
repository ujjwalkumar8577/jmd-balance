const express = require('express');
const router = express.Router();
const { findData, updateData } = require('../controllers/party.controller');
const { validateFindBody, validateUpdateBody } = require('../middlewares/validation');
const { multerUpload } = require('../middlewares/multer.upload');

router.get('/balance-summary', validateFindBody, findData);
router.post('/balance-summary', multerUpload().single('file'), validateUpdateBody, updateData);

module.exports = router;
