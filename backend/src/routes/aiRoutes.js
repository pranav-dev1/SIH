const express = require('express');
const router = express.Router();
const { askAiAssistant, getRecommendations } = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

router.post('/chat', askAiAssistant);
router.get('/recommendations', authMiddleware, getRecommendations);

module.exports = router;
