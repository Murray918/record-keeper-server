const User = require('../models/user');

exports.addRecord = function(req, res) {
	//get the and email record from request
	let record = req.body.record;
	let email = req.body.email;

	//find the user the record belongs to
	User.findOne({ email: email }, function(err, user) {
		console.log(user);
		if (err) {
			res.send(err);
		}
		//push it to the document
		user.records.push(record);
		console.log(user);
		//save the document
		user.save();
		//return a message that says success
		res.status(200).send({
			Success: 'you have saved this record to the database',
			record
		});
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
