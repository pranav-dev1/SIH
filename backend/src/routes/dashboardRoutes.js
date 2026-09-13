const express = require('express');
const router = express.Router();
const { getTraineeDashboard, getTrainerDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.get('/trainee', authMiddleware, checkRole('trainee', 'admin'), getTraineeDashboard);
router.get('/trainer', authMiddleware, checkRole('trainer', 'admin'), getTrainerDashboard);
router.get('/admin', authMiddleware, checkRole('admin'), getAdminDashboard);

module.exports = router;
