const { Post } = require('../models');

module.exports = {
  // Create new post
  async createPost( req, res ) {
    try {
      const newPost = await Post.create(req.body);

      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a post
  async removePost( req, res ) {
    try {
      const post = await Post.findOneAndDelete({ _id: req.params.id });

      if (!post) {
        res.status(404).json({ message: 'No post found with this id!' });
      }

      res.status(200).json({ message: 'Post successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a post
  async updatePost( req, res ) {
    try {
      const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

      if (!post) {
        res.status(404).json({ message: 'No post found with this id!' });
      }

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get all posts
  async getAllPost( req, res ) {
    try {
      const posts = await Post.find({});

      if (!posts) {
        res.status(404).json({ message: 'No posts found' });
      }

      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single post
  async getSinglePost( req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });

      if (!post) {
        res.status(404).json({ message: 'No post found with this id!' });
      }

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add comment to a post
  async addComment( req, res ) {
    try {
      const comment = {
        text: req.body.commentText,
        user_id: req.body.user_id
      };

      const post = await Post.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: comment } }, { new: true });

      if (!post) {
        res.status(400).json({ message: 'Error posting comment.' });
      }

      res.status(200).json({ message: 'Comment successfully posted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a comment from a post
  async removeComment( req, res ) {
    try {
      const post = await Post.findOneAndUpdate({ _id: req.params.id }, { $pull: { comments: { _id: req.params.commentId } } }, { new: true });

      if (!post) {
        res.status(400).json({ message: 'Could not delete the comment.'});
      }

      res.status(200).json({ message: 'Comment successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};