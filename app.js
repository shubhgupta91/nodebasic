var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash')

const dotenv = require("dotenv");

// var URL = require('url').URL;
// var myURL = new URL('http://www.example.com/foo?bar=1#main');

// console.log(myURL.host);


dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var sessionStore = new session.MemoryStore;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));
app.use(flash());

var mongoDB = process.env.DB_CONNECT;
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });
var db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoLab instance.'))
db.on('error', error => console.log('Error connecting to MongoLab:', error));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
