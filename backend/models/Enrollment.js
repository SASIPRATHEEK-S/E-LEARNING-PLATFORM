const mongoose = require('mongoose');
const applyJsonTransform = require('./plugins/toJSONTransform');

const enrollmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    enrolledAt: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

applyJsonTransform(enrollmentSchema);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
