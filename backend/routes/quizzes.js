const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getQuizzes,
  getMyQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizzesController');

router.get('/', auth, getQuizzes);
router.get('/my', auth, getMyQuizzes);
router.post('/', auth, createQuiz);
router.put('/:id', auth, updateQuiz);
router.delete('/:id', auth, deleteQuiz);

module.exports = router;
