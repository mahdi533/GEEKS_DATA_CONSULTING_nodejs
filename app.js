var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose =require('mongoose');

var cron =require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter=require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/logins',loginRouter);

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

cron.schedule('0 0 0 * * *', () => {
  var User = require('../models/users');
  User.updateOne({nbrVote:0}).then(() => {
   
    console.log("Nombre de vote reinitialiser a 0 !"); 
  
});
});
var mongoDB ='mongodb://127.0.0.1/ExmenNode';
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).then(
  ()=>{console.log("connected to db");
  app.listen(3001);
}
).catch(err=>{8 
  console.log(err);
})

module.exports = app;
