const router = require('express').Router();
const articleRoutes = require('./articles');

// Set all article routes to the /api/articles path
router.use('/articles', articleRoutes);

module.exports = router;
