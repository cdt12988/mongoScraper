const router = require('express').Router();
const controller = require('../../controllers/articleController');

// The '/' route is set to /api/articles for this file

router.route('/:id')
	.post(controller.saveNote);
/*
	.get((req, res) => {
		controller.scrapeArticles(req, res);
	});
*/
/*
	.get(controller.findAll)
	.post(controller.create);
*/
	
/*
router.route("/:id")
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.remove);
*/
	
module.exports = router;