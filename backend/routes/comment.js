const express = require('express');
const router = express.Router();
const { authenticateJwt } = require('../middleware/auth');
const {
  createComment,
  getComments,
  updateComment,
  deleteComment
} = require('../controller/commentController');

// Public routes
router.get('/blog/:blogId', getComments);

// Protected routes
router.post('/blog/:blogId', authenticateJwt, createComment);
router.put('/:id', authenticateJwt, updateComment);
router.delete('/:id', authenticateJwt, deleteComment);

module.exports = router; 