var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var indexRouter = require('./controller/index');
var usersRouter = require('./controller/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/index');
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('Site running on port 3000');
});