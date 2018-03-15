const jwt = require('jwt-simple');
const User = require('../models/user');
//herolu access to our secret or our local config file
const secret = process.env.LOCAL_SECRET || require('../config').secret;

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = function(req, res) {
	console.log(req.body);
	// User has already had their email and password auth'd
	// We just need to give them a token
	res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	// make sure there is an email and a password
	if (!email || !password) {
		return res
			.status(422)
			.send({ error: 'You must provide email and password' });
	}
	// See if a user with the given email exists
	User.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return next(err);
		}

		// If a user with a given email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}
		// If a user with email does not exist, create and save a user record
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}
			// Respond to request indicating that the user was created
			res.json({ token: tokenForUser(user) });
		});
	});
};
