var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var hungryPeopleController   = require('../controllers/hungrypeople');
var truckOwnersController   = require('../controllers/truckowners');
var globals = require('./globals');


module.exports = function(app, passport) {
  // define an Express router to use with ALL ('/') routes
  app.use('/', router);

  // oauth paths:
  router.get('/to/facebook', setTrucker,
    passport.authenticate('facebook', {authType: 'reauthenticate', scope: ['email']}));

  router.get('/hp/facebook', setHungry,
    passport.authenticate('facebook', {authType: 'reauthenticate', scope: ['email']}));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });

  // logout path
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

  function setTrucker(req, res, next) {
    globals.truckerAuth.push(true);
    next();
  }

  function setHungry(req, res, next) {
    globals.truckerAuth.push(false);
    next();
  }

  // root path:
  router.get('/',welcomeController.index, ensureAuthenticated);

  // users resource paths:
  router.get('/hungrypeople',     hungryPeopleController.index);
  router.get('/hungrypeople/:id', hungryPeopleController.show);
  router.get('/truckowners',      truckOwnersController.index);
  router.get('/truckowners/:id',  truckOwnersController.show);
};
