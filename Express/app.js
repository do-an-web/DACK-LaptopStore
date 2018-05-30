var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var homeController = require('./controller/homeController'),
    shopController = require('./controller/shopController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
<<<<<<< HEAD
app.set('view engine', 'hbs'); 
=======
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');
>>>>>>> db21791c11b8451605e483d3a5495ef883932735

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
app.use('/', indexRouter);
app.use('/users', usersRouter);



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
=======
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.use('/home', homeController);
app.use('/shop', shopController);
>>>>>>> db21791c11b8451605e483d3a5495ef883932735

app.listen(3000, () => {
  console.log('Site running on port 3000');
});