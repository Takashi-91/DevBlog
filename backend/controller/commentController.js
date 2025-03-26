const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = new Comment({
      content,
      user: req.user._id,
      blog: blogId
    });

    await comment.save();
    
    // Add comment to blog's comments array
    blog.comments.push(comment._id);
    await blog.save();

    // Populate user information
    await comment.populate('user', 'username profile.avatar');

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment', error: err.message });
  }
};

// Get comments for a blog post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('user', 'username profile.avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.content = content;
    await comment.save();

    // Populate user information
    await comment.populate('user', 'username profile.avatar');

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating comment', error: err.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // Remove comment from blog's comments array
    const blog = await Blog.findById(comment.blog);
    if (blog) {
      blog.comments = blog.comments.filter(id => id.toString() !== comment._id.toString());
      await blog.save();
    }

    await comment.remove();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment
}; 