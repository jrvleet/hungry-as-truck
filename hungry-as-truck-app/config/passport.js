var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FB_CB_URL,
      profileFields: ['id', 'displayName', 'photos'],
      enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
}
