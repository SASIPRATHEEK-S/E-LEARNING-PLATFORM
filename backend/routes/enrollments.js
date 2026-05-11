const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getEnrollments, createEnrollment, updateLastActive } = require('../controllers/enrollmentsController');

router.get('/', auth, getEnrollments);
router.post('/', auth, createEnrollment);
router.put('/course/:courseId/last-active', auth, updateLastActive);

module.exports = router;
