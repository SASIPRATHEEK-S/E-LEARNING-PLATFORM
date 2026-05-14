const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getProfile, updateProfile, uploadProfileImage } = require('../controllers/profileController');

// Get user profile
router.get('/', auth, getProfile);

// Update profile
router.put('/', auth, updateProfile);

// Upload profile image
router.post('/upload', auth, uploadProfileImage);

module.exports = router;