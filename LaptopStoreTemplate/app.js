var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var express = require('express');
var express_handlebars  = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');


var homeRouter = require('./routes/home');
var shopRouter = require('./routes/shop');

var app = express();

app.engine('hbs', express_handlebars({
    extname: '.hbs',
    defaultLayout: 'main.layout.hbs',
    partialsDir: path.join(__dirname, 'views/_partials'),
    layoutsDir: path.join(__dirname, 'views/_layouts'),
    helpers: {
        section: express_handlebars_sections()
    }
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Muốn ngăn chặn người dùng truy cập vào file public -> viết middle-ware xử lý ngăn chặn giữa response và request
app.use(express.static(path.resolve(__dirname, 'public')));

/////////////// Router////////////////////
//Home
app.use('/', homeRouter);
//Shop
app.use('/shop', shopRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
/////////////////////////////////////////
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
