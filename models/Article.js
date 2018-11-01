const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	headline: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true
	},
	note: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Note"
	}
});

const Article = mongoose.model('Article', Schema);

module.exports = Article;
