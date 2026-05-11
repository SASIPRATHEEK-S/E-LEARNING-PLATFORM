const mongoose = require('mongoose');
const applyJsonTransform = require('./plugins/toJSONTransform');

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: { type: String, required: true },
    studentId: { type: String, required: true },
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    score: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
    timeSpent: { type: Number, default: 0 },
  },
  { timestamps: true },
);

applyJsonTransform(quizAttemptSchema);

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
