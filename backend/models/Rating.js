const mongoose = require('mongoose');
const applyJsonTransform = require('./plugins/toJSONTransform');

const ratingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    courseRating: { type: Number, required: true, min: 1, max: 5 },
    instructorRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
    ratedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

ratingSchema.index({ userId: 1, courseId: 1 }, { unique: true });

applyJsonTransform(ratingSchema);

module.exports = mongoose.model('Rating', ratingSchema);
