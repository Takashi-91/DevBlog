const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    const blog = new Blog({
      title,
      content,
      tags,
      status,
      user: req.user._id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog post', error: err.message });
  }
};

// Get all blog posts with pagination and filters
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, tag, search } = req.query;
    const query = {};

    // Apply filters
    if (status) query.status = status;
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query)
      .populate('user', 'username profile.avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Blog.countDocuments(query);

    res.json({
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
};

// Get a single blog post
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user', 'username profile.avatar')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username profile.avatar' }
      });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user owns the blog post
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog post' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.status = status || blog.status;

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog post', error: err.message });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user owns the blog post
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog post' });
    }

    // Delete associated comments
    await Comment.deleteMany({ blog: blog._id });
    
    // Delete the blog post
    await blog.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog post', error: err.message });
  }
};

// Like/Unlike a blog post
const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const likeIndex = blog.likes.indexOf(req.user._id);
    if (likeIndex === -1) {
      blog.likes.push(req.user._id);
    } else {
      blog.likes.splice(likeIndex, 1);
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error toggling like', error: err.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  toggleLike
}; 