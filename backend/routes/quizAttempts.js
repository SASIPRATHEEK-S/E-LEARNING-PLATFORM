const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getQuizAttempts, createQuizAttempt } = require('../controllers/quizAttemptController');

router.get('/', auth, getQuizAttempts);
router.post('/', auth, createQuizAttempt);

module.exports = router;
