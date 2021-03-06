var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var secrets = require('./config/secrets');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new localStrategy(secrets.twitter, function(req, accessToken, tokenSecret, profile, done) {
  User.findOne({ twitterId: profile.id }, function(err, existingUser) {
    if (existingUser) return done(null, existingUser);

    var user = new User();

    user.twitterId = profile.id;
    user.username = profile.id;
    user.email = '';
    user.name = profile.displayName;
    user.created = new Date();
    user.accessToken = user.encrypt(accessToken);
    user.tokenSecret = user.encrypt(tokenSecret);

    user.save(function(err) {
      done(err, user);
    });
  });
}));

exports.twitter = passport.authenticate('twitter');
exports.twitterCallback = passport.authenticate('twitter', { failureRedirect: '/' });
