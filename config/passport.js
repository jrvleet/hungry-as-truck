var FacebookStrategy = require('passport-facebook').Strategy;
var HungryPerson = require('../models/hungryperson');
var TruckOwner = require('../models/truckowner');
var globals = require('./globals');

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
            var isTrucker = globals.truckerAuth.shift();

            if(isTrucker){
              TruckOwner.findOne({
                  facebookId: profile.id
              }, function(err, user) {
                  if (err) {
                      return done(err);
                  }
                  //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                  if (!user) {
                      user = new TruckOwner({
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
            } else {

              HungryPerson.findOne({
                  facebookId: profile.id
              }, function(err, user) {
                  if (err) {
                      return done(err);
                  }
                  //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                  if (!user) {
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

        }
    ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    HungryPerson.findById(id, function(err, user) {
      if (user) {
        done(err, user);
      } else {
        TruckOwner.findById(id, function(err, user) {
          done(err, user);
        });
      }
    });
  });
}
