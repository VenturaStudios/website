var express = require('express');
var glob = require('glob');
var morgan = require('morgan');
var fs = require('fs');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var log4js = require('log4js');



module.exports = function(app, config) {

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  //Passport authentication
  /*require('./passport')(passport);
  app.use(session({ secret: 'instafeedbackapi' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session());*/

  /* Set up logs */
  // Access log: create a write stream (in append mode)
  var accessLogStream = fs.createWriteStream(config.accessLog, {flags: 'a'})
  //app.use(morgan('combined', {stream: accessLogStream}));

  // Custom log
  log4js.loadAppender('file');
  log4js.addAppender(log4js.appenders.file(config.customLog), 'instafeedback');
  var fileLog = log4js.getLogger('instafeedback');
  fileLog.setLevel('DEBUG');


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  //app.use(cookieParser());
  app.use(compress());
  
  //Set up the statics folder
  app.use(express.static(config.root + '/' + config.public));
  app.use(express.static(config.root + '/' + config.demos));
  app.use(methodOverride());

  //Initialize all the controllers for the API routes
  var controllers = glob.sync(config.root + '/server/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, fileLog);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development' || app.get('env') === 'localhost'){
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

  //Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });

};
