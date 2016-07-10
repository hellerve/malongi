var bodyParser = require('body-parser')
  , config     = require('./config')
  , ejs        = require('ejs')
  , express    = require('express')
  , logger     = require('morgan')
  , path       = require('path')
  , routes     = require('./routes/index')

  , app        = express()
  ;
 

// view engine setup
app.set('port', config.port); // set to correct path
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
  console.log("not found");
  res.render('index');
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index');
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('index');
});


module.exports = app;
