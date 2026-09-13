const express = require('express');
const router = express.Router();
const { getMyCertificates, getCertificateById, generateCertificate } = require('../controllers/certificateController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getMyCertificates);
router.get('/:id', getCertificateById);
router.post('/', authMiddleware, generateCertificate);

module.exports = router;
