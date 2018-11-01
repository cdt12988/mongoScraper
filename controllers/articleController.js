const Article = require('../models').Article;
const Note = require('../models').Note;
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
	scrapeArticles: (req, res) => {
		console.log('Scraping Articles...');
		axios.get('https://www.mlb.com/rangers').then(response => {
			const $ = cheerio.load(response.data);
			let results = [];
			let headlines = [];
			
			$('li.p-headline-stack__headline').each((i, element) => {
				const text = $(element).find('a').text();
				const link = $(element).find('a').attr('href');
				
				if(headlines.indexOf(text) < 0) {
					headlines.push(text);
					results.push({
						headline: text,
						link: link
					});
					console.log('Article found:', text);
				}
			});
			
			let index = 0;
			const length = results.length;
			
			console.log(`Saving articles (${index} / ${length})`);
			const saveScrapedArticles = () => {
				if(index < results.length) {
					Article.create(results[index]).then(dbRes => {
						console.log(`Saving articles (${index} / ${length})`);
						index++;
						saveScrapedArticles();
					}).catch(err => {
						console.log('Mongoose Article Save Error:', err.errmsg);
						index++;
						saveScrapedArticles();
					});
				} else {
					console.log(`Saving articles (${index} / ${length})`);
					console.log('Save complete!');
					Article.find().populate('note').then(articles => {
						res.render('main', { articles: articles });
					});
				}
			}
			saveScrapedArticles();
		}).catch(err => {
			console.log(err);
			res.status(422).json(err);
		});
	},
	saveNote: (req, res) => {		 
		 const articleID = req.params.id;
		 
		 Note.create(req.body).then(note => {
			 //	After note is created, find the article and add the associaiton with this new note (note: note._id)
			 return Article.findOneAndUpdate({ _id: articleID}, { note: note._id}, { new: true });
		 }).then(article => {
			 //	Because we returned the promise above, we can chain together the MongoDB promises like this
			 res.json(article);
		 }).catch(err => {
			 res.json(err);
		 });
	}
};