var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var sha256 = require('js-sha256');

class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // For the given username fetch user from DB
    let mockedUsername = 'tonychen@outlook.com';
    let mockedPassword = '68876513c0c5479533d8a653e471ed77a4e7c27a96dd3ab1741da374d0d2f9c2';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
}

// view engine setup

var app = express();
let handlers = new HandlerGenerator();
app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/users/login', handlers.login);
app.post('/users', middleware.checkToken);
app.use('/', indexRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
