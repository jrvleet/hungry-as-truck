var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport');
var locus        = require('locus');

// Load local libraries.
var env      = require('./config/environment'),
    mongoose = require('./config/database');

// Instantiate a server application.
var app = express();

// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);
// EJS view engine config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');
app.locals._ = require('lodash');

// Logging layer.
app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('notsosecretnowareyou'));
app.use(session({
  secret: 'WDIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Useful for debugging the state of requests.
app.use(debugReq);

// Configure passport authentication and
// load user on to request object if exists.
require('./config/passport')(passport);

// Defines all of our "dynamic" routes, passing
// configured passport object.
require('./config/routes')(app, passport);

// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling layer.
app.use(function(err, req, res, next) {
  // In development, the error handler will print stacktrace.
  err = (app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('REQ: ..............');
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

module.exports = app;
