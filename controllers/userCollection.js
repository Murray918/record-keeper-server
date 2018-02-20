const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').ObjectId;

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
		//get the album and remove it
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

exports.updateUser = function(req, res) {
	//TODO update a users profile information
	res.send('this endpoint is under construction');
};

exports.deleteUser = function(req, res) {
	//TODO remove a user from db
	res.send('this endpoint is under construction');
};
