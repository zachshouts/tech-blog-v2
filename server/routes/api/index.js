const router = require('express').Router();
// Import your routes here:
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// Add your routes here:
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;