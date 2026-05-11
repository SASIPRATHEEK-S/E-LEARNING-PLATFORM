const mongoose = require('mongoose');
const applyJsonTransform = require('./plugins/toJSONTransform');

const progressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completedTopics: { type: [String], default: [] },
    progress: { type: Number, default: 0 },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

applyJsonTransform(progressSchema);

module.exports = mongoose.model('Progress', progressSchema);
