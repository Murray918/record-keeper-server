const Authentication = require('./controllers/authentication'),
	passportService = require('./services/passport'),
	passport = require('passport'),
	spotify = require('./controllers/spotify'),
	userCollection = require('./controllers/userCollection');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res, next) {
		console.log('party with this route first');
		res.send({ message: 'bingBangBoop I am behind you!' });
	});
	app.post('/signup', Authentication.signup);
	app.post('/signin', requireSignIn, Authentication.signin);
	app.get('/spotify/:type/:query', requireAuth, spotify.search);
	app.post('/addrecord', requireAuth, userCollection.addRecord);
	app.post('/removerecord', requireAuth, userCollection.removeRecord);
	app.get('/viewrecords/:email', requireAuth, userCollection.viewRecords);
	app.post('/updateuser', requireAuth, userCollection.updateUser);
	app.post('/deleteuser', requireAuth, userCollection.deleteUser);
};
