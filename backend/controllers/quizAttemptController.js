const QuizAttempt = require('../models/QuizAttempt');

exports.getQuizAttempts = async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'instructor') {
      const attempts = await QuizAttempt.find().sort({ completedAt: -1 });
      return res.json(attempts);
    }
    const attempts = await QuizAttempt.find({ studentId: req.user.id }).sort({ completedAt: -1 });
    res.json(attempts);
  } catch (error) {
    console.error('getQuizAttempts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createQuizAttempt = async (req, res) => {
  try {
    const { quizId, answers, score, completedAt, timeSpent } = req.body;
    if (!quizId) {
      return res.status(400).json({ message: 'quizId is required' });
    }
    const attempt = await QuizAttempt.create({
      quizId,
      studentId: req.user.id,
      answers: answers || {},
      score: score || 0,
      completedAt: completedAt ? new Date(completedAt) : new Date(),
      timeSpent: timeSpent || 0,
    });
    res.status(201).json(attempt);
  } catch (error) {
    console.error('createQuizAttempt error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
