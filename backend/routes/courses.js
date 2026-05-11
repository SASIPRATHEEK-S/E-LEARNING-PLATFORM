const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getCourses,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/coursesController');

router.get('/', auth, getCourses);
router.get('/my', auth, getMyCourses);
router.post('/', auth, createCourse);
router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);

module.exports = router;
