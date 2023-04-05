const router = require('express').Router();

const {
  createPost,
  removePost,
  updatePost,
  getAllPost,
  getSinglePost,
  addComment,
  removeComment
} = require('../../controllers/post-controller');

// Add your routes here:
router.route('/').get(getAllPost).post(createPost);
router.route('/:id').get(getSinglePost).put(updatePost).delete(removePost);
router.route('/:id/comments').post(addComment);
router.route('/:id/comments/:commentId').delete(removeComment);
module.exports = router;