const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// const logger =

const Record = new Schema({
	id: String,
	artist: String,
	title: String,
	imageLarge: String,
	imageMedium: String,
	imagesSmall: String,
	uri: String
});

const UserShcema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	records: [Record]
});

// RecordSchema;

// On Save Hook, encrypt password

UserShcema.pre('save', function(next) {
	console.log('this is our user :', this);
	const user = this;
	console.log('this is our this: ', user);
	// bcrypt.genSalt(10, function(err, salt) {
	// 	if (err) {
	// 		return next(err);
	// 	}

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) {
			return next(err);
		}
		console.log('here is our authentication hash :', hash);
		user.password = hash;
		next();
	});
	// });
});

UserShcema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		console.log('this is our user :', this);
		if (err) {
			return callback(err);
		}
		console.log(
			'this.password : ',
			this.password,
			'candidatePassword : ',
			candidatePassword
		);
		callback(null, isMatch);
	});
};

const ModelClass = mongoose.model('localUser', UserShcema);

module.exports = ModelClass;
