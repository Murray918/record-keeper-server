const express = require('express'),
	http = require('http'),
	bodyparser = require('body-parser'),
	morgan = require('morgan'),
	app = express(),
	router = require('./router'),
	mongoose = require('mongoose'),
	mongodb = require('mongodb'),
	cors = require('cors');
//connection to mongoose and promise set up
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI, function(err, database) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	const logger = function(req, res, next) {
		console.log(JSON.stringify(req.body, null, 2));
		next();
	};
	//this prepares our app
	app.use(morgan('dev'));
	app.use(cors());
	app.use(bodyparser.json({ type: '*/*' }));
	app.use(logger);
	router(app);
	//this runs the server and tells it to listen on the given port
	// Initialize the app.
	var server = app.listen(process.env.PORT || 8080, function() {
		var port = server.address().port;
		console.log('App now running on port', port);
	});
});

// heroku	https://git.heroku.com/young-journey-11063.git (fetch)
// heroku	https://git.heroku.com/young-journey-11063.git (push)
