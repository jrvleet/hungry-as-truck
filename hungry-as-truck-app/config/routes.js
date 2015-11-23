var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var hungryPeopleController   = require('../controllers/hungrypeople');
var truckOwnersController   = require('../controllers/truckowners');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
      res.render('index', { user: req.user });
  });

  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
  // root path:
  router.get('/', welcomeController.index);

  // users resource paths:
  router.get('/people',     hungryPeopleController.index);
  router.get('/people/:id', hungryPeopleController.show);
  router.get('/truckowners',     truckOwnersController.index);
  router.get('/truckowners/:id', truckOwnersController.show);

  app.use('/api', router);
}
