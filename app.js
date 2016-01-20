
var express = require('express');
var app = express();
var http = require('http').Server(app);
var glob = require('glob');

var port = process.env.PORT || 3000;

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.use("/views/partials/:name", function (req, res) {
  res.render('partials/' + req.params.name);
});

app.get('/*', function(req, res) {
  res.render('index', {
    title: 'TWEB Project - TE2'
  });
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development'){
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
});


http.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
