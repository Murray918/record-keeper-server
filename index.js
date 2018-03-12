const express = require('express'),
	http = require('http'),
	bodyparser = require('body-parser'),
	morgan = require('morgan'),
	cluster = require('cluster'),
	// app = express(),
	router = require('./router'),
	path = require('path'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	numCPUs = require('os').cpus().length;
//connection to mongoose and promise set up
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/auth');

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.error(
			`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${
				signal
			}`
		);
	});
} else {
	const app = express();

	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
	//this prepares our app
	app.use(morgan('dev'));
	app.use(cors());
	app.use(bodyparser.json({ type: '*/*' }));
	router(app);
	//this runs the server and tells it to listen on the given port
	const PORT = process.env.PORT || 3090,
		server = http.createServer(app);
	server.listen(PORT);
	//show that server is listening
	console.log('Server listening on:', PORT);

	// All remaining requests return the React app, so it can handle routing.
	app.get('*', function(request, response) {
		response.sendFile(
			path.resolve(__dirname, '../react-ui/build', 'index.html')
		);
	});

	app.listen(PORT, function() {
		console.error(
			`Node cluster worker ${process.pid}: listening on port ${PORT}`
		);
	});
}
