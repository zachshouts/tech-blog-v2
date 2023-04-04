const router = require('express').Router();

const {
  createPost,
  removePost,
  updatePost,
  getAllPost,
  getSinglePost
} = require('../../controllers/post-controller');

// Add your routes here:
router.route('/').get(getAllPost).post(createPost);
router.route('/:id').get(getSinglePost).put(updatePost).delete(removePost);

module.exports = router;