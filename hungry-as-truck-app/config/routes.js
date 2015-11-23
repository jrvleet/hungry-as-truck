var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');

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
  router.get('/users',     usersController.index);
  router.get('/users/:id', usersController.show);

  app.use('/api', router);
}
