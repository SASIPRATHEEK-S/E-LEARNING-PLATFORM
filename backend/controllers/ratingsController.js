const Rating = require('../models/Rating');

exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ ratedAt: -1 });
    res.json(ratings);
  } catch (error) {
    console.error('getRatings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrUpdateRating = async (req, res) => {
  try {
    const { courseId, courseRating, instructorRating, comment } = req.body;
    if (!courseId || courseRating == null || instructorRating == null) {
      return res.status(400).json({ message: 'courseId, courseRating and instructorRating are required' });
    }
    const rating = await Rating.findOneAndUpdate(
      { userId: req.user.id, courseId },
      {
        userId: req.user.id,
        courseId,
        courseRating,
        instructorRating,
        comment: comment || '',
        ratedAt: new Date(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    res.status(201).json(rating);
  } catch (error) {
    console.error('createOrUpdateRating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
