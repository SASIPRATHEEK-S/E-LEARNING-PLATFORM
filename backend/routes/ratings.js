const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getRatings, createOrUpdateRating } = require('../controllers/ratingsController');

router.get('/', auth, getRatings);
router.post('/', auth, createOrUpdateRating);

module.exports = router;