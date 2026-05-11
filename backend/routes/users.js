const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const { getUsers, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', auth, authorize('admin', 'instructor'), getUsers);
router.put('/:id', auth, authorize('admin'), updateUser);
router.delete('/:id', auth, authorize('admin'), deleteUser);

module.exports = router;
