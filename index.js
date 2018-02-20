const express = require('express'),
	http = require('http'),
	bodyparser = require('body-parser'),
	morgan = require('morgan'),
	app = express(),
	router = require('./router'),
	mongoose = require('mongoose'),
	cors = require('cors');
//connection to mongoose and promise set up
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/auth');
//this prepares our app
app.use(morgan('combined'));
app.use(cors());
app.use(bodyparser.json({ type: '*/*' }));
router(app);
//this runs the server and tells it to listen on the given port
const port = process.env.PORT || 3090,
	server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
