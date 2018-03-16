'use strict';
const User = require('../models/user');

exports.addRecord = function(req, res) {
	//get the and email record from request
	let record = req.body.album;
	let email = req.body.email;

	//find the user the record belongs to
	User.findOne({ email: email }, function(err, user) {
		console.log(user);
		if (err) {
			res.send(err);
		}
		//push it to the document
		user.records.unshift(record);
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
	let recordId = req.body.id;
	let email = req.body.email;
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		//this one is trickey make sure the targed is the correct id i.e  record._id
		//this should be filted on the front end
		console.log(
			'<<<<<<<<<<<<<<<<<LOOK!>>>>>>>>>>>>>>>>>>>>>',
			user.records.id(recordId)
		);
		//remove the record with the target id
		user.records.id(recordId).remove();
		user.save();
		res.status(200).send('The record was removed');
	});
};

exports.viewRecords = function(req, res) {
	User.findOne({ email: req.params.email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		let found = user;
		res.status(200).send(user.records);
	});
};

exports.updateUserEmail = function(req, res) {
	//set the email from the request
	let email = req.body.oldEmail;
	let newEmail = req.body.newEmail;
	// secpmd test to see if the email exists
	if (!newEmail) {
		return res.status(422).send({ error: 'You must provide new Email' });
	}

	//make sure that the does not exise
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		//set and save the new email
		user.email = newEmail;
		user.save();
		res.status(200).send('Success email updated');
	});
};

exports.updateUserPassword = function(req, res) {
	let email = req.body.email;
	let password = req.body.password;
	if (!password) {
		return res.status(422).send({ error: 'You must provide new password' });
	}
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		//set
		user.password = password;
		user.save();
		res.status(200).send('Success password updated');
	});
};

exports.deleteUser = function(req, res) {
	let email = req.body.email;
	User.remove({ email: email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send('User profile has been deleted');
	});
};
