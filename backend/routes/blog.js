const express = require('express');
const router = express.Router();
const authenticateJwt = require('../middleware/auth');
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  toggleLike
} = require('../controller/blogController');

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected routes
router.post('/', authenticateJwt, createBlog);
router.put('/:id', authenticateJwt, updateBlog);
router.delete('/:id', authenticateJwt, deleteBlog);
router.post('/:id/like', authenticateJwt, toggleLike);

module.exports = router; 