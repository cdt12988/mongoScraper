const router = require('express').Router();
const controller = require('../controllers/articleController');

// The '/' route is set to /api/articles for this file

router.route('/')
	.get(controller.scrapeArticles);
	
module.exports = router;