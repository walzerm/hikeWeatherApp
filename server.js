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
var FacebookStrategy = require('passport-facebook').Strategy;

// load env
require('dotenv').load();

//create express app instance
var app = express();

// confiure app settings
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));

/* keys encrypt my cookie
   name is renaming my session variable
   if name was potato instead of session
   then instead of accessing session thru
   req.session, I'd access it thru
   req.potato
*/

app.use(cookieSession({
  name : 'session',
  keys : ['jhsdfkjsfkjl']
}));

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set assets folder
app.use(express.static(path.join(__dirname, 'assets')));

// use morgan to log request to the console
app.use(morgan('tiny'));

//uset method overload with variable called _method
app.use(methodOverride('_method'));


// use the router
app.use('/', router.index);

// configure passport
app.use(passport.initialize());
app.use(passport.session());

// facebook-passport auth
// serialization
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//configure
passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName', 'picture.type(large)']

  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      console.log(profile);
      return done(null, profile);
    });
  }
));

// set cookies for regular auth
// should be before routes
var setUserNameLocal = function (req, res, next) {
  res.locals.currentUser = req.cookies.user
  next()
}

app.use(setUserNameLocal);

app.use('/auth', router.auth);
app.use('/users', router.users);

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
