const router = require('express').Router();

const apiRoutes = require('./api');
const articleRoutes = require('./articles.js');

//	Set all API routes to the /api path
router.use('/api', apiRoutes);
//	If AJAX Call, not explicitly defined, use the main article routes
router.use('*', articleRoutes);

module.exports = router;