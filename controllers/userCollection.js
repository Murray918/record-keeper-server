'use strict';
const User = require('../models/user');

exports.addRecord = function(req, res) {
	//get the and email record from request
	console.log(req.body);
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
	console.log('record id : ', recordId);
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
	console.log(req.params);
	User.findOne({ email: req.params.email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		let found = user;
		res.status(200).send(user.records);
	});
};

exports.updateUserEmail = function(req, res) {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide new Email' });
	}
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		//set
		user.email = email;
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
		console.log(user);
		res.send('User profile has been deleted');
	});
};
