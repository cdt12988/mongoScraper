//	Server and DB Dependencies
const express = require('express');
const mongoose = require('mongoose');

//	PORT, Routes and Additional Dependencies
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const env = require('dotenv').load();

//	Setup server
const app = express();

//	Setup logger in dev-mode
app.use(logger('dev'));

//	Setup parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//	Setup static directory
app.use(express.static('public'));

// Setup View Engine
app.set('views', './views');
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//	Implement the loaded routes
app.use(routes);

//	Establish DB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongoScraper');	//	, { useNewUrlParser: true }

//	Run server
app.listen(PORT, function() {
	console.log(`🌎  ==> App listening on PORT ${PORT}...`);
});