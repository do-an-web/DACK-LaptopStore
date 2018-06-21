var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var wnumb = require('wnumb');

var express = require('express');
var express_handlebars  = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);



var homeRouter = require('./routes/home');
var shopRouter = require('./routes/shop');
var cartRouter = require('./routes/cart');
var detailRouter = require('./routes/detail');
var infoAccountRouter = require('./routes/infoAccount');
var paymentRouter = require('./routes/payment');
var signInRouter = require('./routes/signIn');
var userHistoryInRouter = require('./routes/userHistory');
var userHistoryDetailInRouter = require('./routes/userHistoryDetail');

var userRouter = require('./routes/user');

/*******Duong************/
var userController = require('./controller/userController');
/************************/
var app = express();

app.engine('hbs', express_handlebars({
    extname: '.hbs',
    defaultLayout: 'main.layout.hbs',
    partialsDir: path.join(__dirname, 'views/_partials'),
    layoutsDir: path.join(__dirname, 'views/_layouts'),
    helpers: {
        section: express_handlebars_sections(),
            number_format: n => {
            var nf = wnumb({
                thousand: ',',
                suffix: ' VND'
            });
            return nf.to(n);
        },
        compare: function(lvalue, rvalue, options) {

            if (arguments.length < 3)
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

            var operator = options.hash.operator || "==";

            var operators = {
                '==': function (l, r) {
                    return l == r;
                },
                '===': function (l, r) {
                    return l === r;
                },
                '!=': function (l, r) {
                    return l != r;
                },
                '<': function (l, r) {
                    return l < r;
                },
                '>': function (l, r) {
                    return l > r;
                },
                '<=': function (l, r) {
                    return l <= r;
                },
                '>=': function (l, r) {
                    return l >= r;
                },
                'typeof': function (l, r) {
                    return typeof l == r;
                }
            }

            if (!operators[operator])
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

            var result = operators[operator](lvalue, rvalue);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }    }
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Muốn ngăn chặn người dùng truy cập vào file public -> viết middle-ware xử lý ngăn chặn giữa response và request
app.use(express.static(path.resolve(__dirname, 'public/Client')));

/////////////// Router////////////////////
//User

app.use('/', userRouter);

//Cart
app.use('/cart', cartRouter);
//Detail Product
app.use('/detail', detailRouter);
//Info Account
app.use('/info-account', infoAccountRouter);
//Payment
app.use('/payment', paymentRouter);
//SignIn
app.use('/sign-in', signInRouter);
//SignUp
//app.use('/sign-up', signUpRouter);
//User history
app.use('/user-history', userHistoryInRouter);
//User history Detail
app.use('/user-history-detail', userHistoryDetailInRouter);






/*Session*/
var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'laptoponline',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


app.use('/user', userController);

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
