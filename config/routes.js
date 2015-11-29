var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var hungryPeopleController   = require('../controllers/hungrypeople');
var truckOwnersController   = require('../controllers/truckowners');


module.exports = function(app, passport) {
  // define an Express router to use with ALL ('/') routes
  app.use('/', router);

  // oauth paths:
  router.get('/to/facebook', setTrucker,
    passport.authenticate('facebook', { scope: ['email'] }));

  router.get('/hp/facebook', setHungry,
    passport.authenticate('facebook', { scope: ['email'] }));

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
    req.session.isTrucker = true;
    next();
  }

  function setHungry(req, res, next) {
    req.session.isTrucker = false;
    next();
  }

  // root path:
  router.get('/',welcomeController.index, ensureAuthenticated);

  // users resource paths:
  router.get('/hungrypeople',        hungryPeopleController.index);
  router.post('/hungrypeople',       hungryPeopleController.create);
  router.get('/hungrypeople/:id',    hungryPeopleController.show);
  router.put('/hungrypeople/:id',    hungryPeopleController.update);
  router.delete('/hungrypeople/:id', hungryPeopleController.destroy);

  router.get('/truckowners',        truckOwnersController.index);
  router.post('/truckowners',        truckOwnersController.create);
  router.get('/truckowners/:id',    truckOwnersController.show);
  router.put('/truckowners/:id',    truckOwnersController.update);
  router.delete('/truckowners/:id', truckOwnersController.destroy);
};
