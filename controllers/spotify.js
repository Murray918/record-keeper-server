const config = require('../config');
const Spotify = require('node-spotify-api');

client_id = config.CLIENT_ID; // Your client id
client_secret = config.CLIENT_SECRET; // Your secret
redirect_uri = 'REDIRECT_URI'; // Your redirect uri

module.exports = function(req, res) {
	var spotify = new Spotify({
		id: client_id,
		secret: client_secret
	});

	spotify
		.search({ type: 'track', query: 'All the Small Things' })
		.then(function(response) {
			console.log(response);
		})
		.catch(function(err) {
			console.log(err);
		});
};
