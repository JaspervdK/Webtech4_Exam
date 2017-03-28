module.exports = function(app) {

	var mongoose = require('mongoose');
	var db       = require('../config/db');
	var Quote	 = require('./models/Quote')

	// index view
	app.get('/index', function(req, res) {
		return res.render('index');
	});

	//Get quotes with search term
	app.get('/search', function (req, res) {
		if(mongoose.connection.readyState != 1) {
			mongoose.connect(db.url);
		}
		mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
		var string = req.query.quote;
		Quote.find({"quote": {'$regex' : '.*' + string + '.*'}}, function(err, quotes) {
			if (err) {
				throw err;
			}
			return res.render('quotes', {quotes: quotes});
		});
	});

	// Get save form for new quote
	app.get('/add', function(req, res) {
					return res.render('add');
	});
	
 // Save new quote
	app.post('/add', function(req, res) {
		  if(mongoose.connection.readyState != 1) {
				  mongoose.connect(db.url);
		  }
				var quote = new Quote({quote: req.body.quote});
				quote.save(function (err, q) {
					  if (err) {
										throw err;
							}
					  console.log("Quote saved");
					  return res.redirect('/index');
				});
	});
	
};
