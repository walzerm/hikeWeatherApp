var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var router = require('./controllers/router');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');


//require fb passport
//insert code here

// load env
require('dotenv').load();

//create express app instance
var app = express();

// confiure app settings
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name : 'session',
  keys : ['jhsdfkjsfkjl']
}));


// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//set assets folder
app.use(express.static(path.join(__dirname, 'assets')));

// use morgan to log request to the console
app.use(morgan('tiny'));

//uset method overload with variable called _method
app.use(methodOverride('_method'));

// use the router
app.use('/', router);

// configure passport
// uncomment code below
// app.use(passport.initialize());
// app.use(passport.session());

// passport code
// insert code here

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
