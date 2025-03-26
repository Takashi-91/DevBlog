const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updateAvatar } = require('../controller/userController');
const authenticateJwt = require('../middleware/auth');

console.log('getProfile type:', typeof getProfile);
console.log('updateProfile type:', typeof updateProfile);
console.log('updateAvatar type:', typeof updateAvatar);

// Profile routes
router.get('/profile', authenticateJwt, getProfile);
router.put('/profile', authenticateJwt, updateProfile);
router.put('/profile/avatar', authenticateJwt, updateAvatar);

module.exports = router; 