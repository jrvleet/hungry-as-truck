var FacebookStrategy = require('passport-facebook').Strategy;
var HungryPerson = require('../models/hungryperson');
var TruckOwner = require('../models/truckowner');

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FB_CB_URL,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      enableProof: true
    },
    function(accessToken, refreshToken, profile, done) {
            //check user table for anyone with a facebook ID of profile.id
            HungryPerson.findOne({
                facebookId: profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                  eval(locus);
                    user = new HungryPerson({
                        photo: profile.photos[0].value,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        facebookId: profile.id
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    return done(err, user);
                }
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
