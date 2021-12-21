var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')

var app = express();

// view engine setup 视图文件
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');  

// 日志打印
// app.use(logger('dev', {
//   stream: process.stdout 
// }));

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('combined', {
    stream: process.stdout 
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态文件
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol_9527_#',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  // store: new RedisStore({client: redis.createClient(6379,'127.0.0.1')}),
  cookie: {
    // path: '/', // 默认
    // httpOnly: true, // 默认
    maxAge: 24 * 60 * 60 * 1000
  }
}))


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

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
