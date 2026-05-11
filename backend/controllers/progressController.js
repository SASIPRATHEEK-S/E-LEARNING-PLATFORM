const Progress = require('../models/Progress');
const Course = require('../models/Course');

exports.getProgress = async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'instructor') {
      const progress = await Progress.find().sort({ updatedAt: -1 });
      return res.json(progress);
    }
    const progress = await Progress.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(progress);
  } catch (error) {
    console.error('getProgress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { courseId, topic } = req.body;
    if (!courseId || !topic) {
      return res.status(400).json({ message: 'courseId and topic are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const totalTopics = course.content?.length || 0;
    const progress = await Progress.findOne({ userId: req.user.id, courseId });
    const completedTopics = new Set(progress?.completedTopics || []);
    completedTopics.add(topic);
    const completedTopicsArray = Array.from(completedTopics);
    const progressPercentage = totalTopics
      ? Math.round((completedTopicsArray.length / totalTopics) * 100)
      : 0;

    const updatedProgress = await Progress.findOneAndUpdate(
      { userId: req.user.id, courseId },
      {
        userId: req.user.id,
        courseId,
        completedTopics: completedTopicsArray,
        progress: progressPercentage,
        completedAt: progressPercentage >= 100 ? progress?.completedAt || new Date() : progress?.completedAt,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.json(updatedProgress);
  } catch (error) {
    console.error('updateProgress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
