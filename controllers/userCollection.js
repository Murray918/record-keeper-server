const User = require('../models/user');

exports.addRecord = function(req, res) {
	//this is our record constructore
	const record = {
		id: '1wVO8nHzgcim0IBzbXnYX0',
		artist: 'Miles Davis',
		titl: 'Bitches Brew (Legacy Edition)',
		imageLarge:
			'https://i.scdn.co/image/e0e76ee2a2e033f561ae8a52af6ae2a0c552fbf1',
		imageMedium:
			'https://i.scdn.co/image/dc81e47114ac7e4bed43d363259e08a2aa7d287e',
		imagesSmall:
			'https://i.scdn.co/image/c292e73ab0b68309c83d8c2ca9855839304c45b1',
		uri: 'spotify:album:1wVO8nHzgcim0IBzbXnYX0'
	};
	//TODO add record to specific users collection
	//find the user
	User.findOne({ email: 'kamurray12@mac.com' }, function(err, user) {
		console.log(user);
		if (err) {
			return next(err, user);
		}
		user.records.push(record);
		console.log(user);
		user.save();
	});

	res.status(200).send({
		Success: 'you have saved this record to the database',
		record
	});
};

exports.removeRecord = function(req, res) {
	//TODO remove record from users collection
	res.send('this endpoint is under construction');
};

exports.viewRecords = function(req, res) {
	//TODO display users record collection
	res.send('this endpoint is under construction');
};

exports.updateUser = function(req, res) {
	//TODO update a users profile information
	res.send('this endpoint is under construction');
};

exports.deleteUser = function(req, res) {
	//TODO remove a user from db
	res.send('this endpoint is under construction');
};
