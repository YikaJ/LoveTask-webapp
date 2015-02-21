var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 路由依赖
var routes = require('./routes/index');
var users = require('./routes/users');

// session依赖
var cookieSession = require("cookie-session");
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require("./settings");

var app = express();

/* session会话 */
app.use(cookieSession({secret: settings.cookieSecret}));
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({db: settings.db})
}));

// 模板位置和模板引擎
app.set('views', path.join(__dirname, './webapp/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('LoveTask_'));

// 静态资源
app.use(express.static(path.join(__dirname, './webapp/bower_components')));
app.use(express.static(path.join(__dirname, './webapp/public')));
app.use(express.static(path.join(__dirname, './webapp/views/partials')));

// 路由地址，与路由文件位置
app.use('/', routes);
app.use('/users', users);

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

var server = app.listen(3000, function() {
    console.log('Express server listening on port ' + 3000);
});

module.exports = app;
