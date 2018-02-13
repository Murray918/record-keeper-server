const config = require('../config');
const Spotify = require('node-spotify-api');

client_id = config.CLIENT_ID; // Your client id
client_secret = config.CLIENT_SECRET; // Your secret
redirect_uri = 'REDIRECT_URI'; // Your redirect uri

exports.search = function(req, res, next) {
	let data = {};
	const spotify = new Spotify({
		id: client_id,
		secret: client_secret
	});
	spotify
		.search({ type: 'album', query: 'Black Messiah', limit: 10 })
		.then(function(response) {
			console.log(response);
			let data = response.albums.items[0];
			res.send(response.albums.items);
		});
	return data;
	next();
};

exports.data = function(next) {
	let data = this;
	console.log(data);
};
