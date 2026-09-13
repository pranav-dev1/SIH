const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

// Optional auth so logged in users see enrollment state
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authMiddleware(req, res, next);
  }
  next();
};

router.get('/', optionalAuth, getCourses);
router.get('/:id', optionalAuth, getCourseById);
router.post('/', authMiddleware, checkRole('trainer', 'admin'), createCourse);
router.put('/:id', authMiddleware, checkRole('trainer', 'admin'), updateCourse);
router.delete('/:id', authMiddleware, checkRole('trainer', 'admin'), deleteCourse);

module.exports = router;
