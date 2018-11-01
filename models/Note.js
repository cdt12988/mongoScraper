const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	body: String
});

var Note = mongoose.model('Note', Schema);

module.exports = Note;
