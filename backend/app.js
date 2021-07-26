var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/route/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET')
  res.header('Access-Control-Max-Age', '3600')
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, x-access-token, x-user-id,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).end('Not Found');
});

// error handler
app.use(function(err, req, res, next) {
  res.status(500).end('Internal Server Error');
});

module.exports = app;
