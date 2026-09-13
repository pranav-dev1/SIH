const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyEnrollments, updateProgress } = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', enrollInCourse);
router.get('/', getMyEnrollments);
router.put('/progress', updateProgress);

module.exports = router;
