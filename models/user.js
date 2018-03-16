const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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
// On Save Hook, encrypt password
UserShcema.pre('save', function(next) {
	const user = this;

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
	// });
});

UserShcema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			console.log(err);
			return callback(err);
		}
		console.log(isMatch);
		callback(null, isMatch);
	});
};

const ModelClass = mongoose.model('localUser', UserShcema);

module.exports = ModelClass;
