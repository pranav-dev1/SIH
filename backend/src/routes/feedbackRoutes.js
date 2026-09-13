const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbackForCourse, getAllFeedback } = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.post('/', authMiddleware, submitFeedback);
router.get('/course/:courseId', getFeedbackForCourse);
router.get('/', authMiddleware, checkRole('trainer', 'admin'), getAllFeedback);

module.exports = router;
