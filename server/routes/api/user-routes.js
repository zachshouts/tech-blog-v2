const router = require('express').Router();

// Import controllers here:
const {
  createUser,
  removeUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  authorizeUser,
  verifyUser
} = require('../../controllers/user-controller');

// Add your routes here:
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(removeUser);
router.route('/auth').post(authorizeUser);
router.route('/verify').post(verifyUser);

module.exports = router;