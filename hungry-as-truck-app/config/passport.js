var FacebookStrategy = require('passport-facebook').Strategy;
var HungryPerson = require('../models/hungryperson');
var TruckOwner = require('../models/truckowner');

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FB_CB_URL,
      profileFields: ['id', 'displayName', 'photos'],
      enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
      HungryPerson.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    HungryPerson.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
