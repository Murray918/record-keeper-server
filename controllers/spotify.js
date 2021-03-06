const Spotify = require('node-spotify-api');
//these are the variables for heroku and our local config
const client_id = process.env.CLIENT_ID || require('../config').CLIENT_SECRET;
const client_secret =
	process.env.CLIENT_SECRET || require('../config').CLIENT_SECRET;

exports.search = function(req, res) {
	console.log('at the top', req.params);
	let dataArray = [];
	let type = req.params.type;
	console.log(type);
	let query = req.params.query;
	console.log(query);
	//create a new url for spotify request with user credintials
	const spotify = new Spotify({
		id: client_id,
		secret: client_secret
	});
	spotify
		//type takes either album, artist, track
		// query takes your search
		.search({ type: req.params.type, query: req.params.query, limit: 18 })
		.then(function(response) {
			// console.log(response);
			//extract only the information that will be used by client
			let dataArray = [];
			let data = response.albums.items.map(function(album) {
				dataArray.push({
					id: album.id,
					artist: album.artists[0].name,
					title: album.name,
					imageLarge: album.images[0].url,
					imageMedium: album.images[1].url,
					imagesSmall: album.images[2].url,
					uri: album.uri
				});
			});
			res.send(dataArray);
		});
};

exports.customRequest = function(req, res) {
	const spotify = new Spotify({
		id: client_id,
		secret: client_secret
	});
	spotify
		.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
		.then(function(data) {
			console.log(data);
		});
};
