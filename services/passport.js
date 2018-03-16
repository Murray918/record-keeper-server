const passport = require('passport'),
	User = require('../models/user'),
	// config = require('../config'),
	JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	LocalStrategy = require('passport-local'),
	secret = process.env.LOCAL_SECRET || require('../config').secret;

// Create local strategy
const localOptions = {
		usernameField: 'email',
		passwordFeild: 'password'
	},
	localLogin = new LocalStrategy(localOptions, function(email, password, done) {
		// Verify this email and password, call done with the user if it is correct email and password
		User.findOne({ email: email }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					return done(err);
				}
				// otherwise call done with false
				if (!isMatch) {
					return done(null, false);
				}
				return done(null, user);
			});
		});
	});

// Setup options for JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: secret
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.sub, function(err, user) {
		// If it does, call 'done' with that other
		if (err) {
			return done(err, false);
		}
		// See if the user ID in the payload exists in our database
		if (user) {
			done(null, user);
			// otherwise, call done without a user object
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
