const router = require('express').Router();
// Import your routes here:
const userRoutes = require('./user-routes');

// Add your routes here:
router.use('/user', userRoutes);

module.exports = router;