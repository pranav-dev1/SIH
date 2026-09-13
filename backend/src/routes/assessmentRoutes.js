const express = require('express');
const router = express.Router();
const { getAssessment, submitAssessment, saveAssessment } = require('../controllers/assessmentController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.get('/:courseId', authMiddleware, getAssessment);
router.post('/:courseId/submit', authMiddleware, submitAssessment);
router.post('/:courseId', authMiddleware, checkRole('trainer', 'admin'), saveAssessment);

module.exports = router;
