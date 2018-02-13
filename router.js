const Authentication = require('./controllers/authentication'),
	passportService = require('./services/passport'),
	passport = require('passport'),
	spotify = require('./controllers/spotify');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'bingBangBoop I am behind you!' });
	});
	app.post('/signup', Authentication.signup);
	app.post('/signin', requireSignIn, Authentication.signin);
	app.get('/spotify');
};
