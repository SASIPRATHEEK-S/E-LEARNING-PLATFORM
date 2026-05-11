const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const { getComplaints, createComplaint, updateComplaintStatus } = require('../controllers/complaintsController');

router.get('/', auth, getComplaints);
router.post('/', auth, createComplaint);
router.put('/:id/status', auth, authorize('admin'), updateComplaintStatus);

module.exports = router;