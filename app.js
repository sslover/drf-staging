
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');


// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

  // server port number
  app.set('port', process.env.PORT || 5000);

  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // database - we're using mongoose / mongoDB
  app.db = mongoose.connect(process.env.MONGOLAB_URI);
  console.log("connected to database");
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// ROUTES

var routes = require('./routes/index.js');

//home page
app.get('/', routes.index);

//about page
app.get('/about', routes.about);

//cities
app.get('/newyork', routes.newyork);
app.get('/bayarea', routes.bayarea);
app.get('/philly', routes.philly);
app.get('/boston', routes.boston);
app.post('/bostonsubmit',routes.bostonSubmission); //boston form POST submits here

//portfolio
app.get('/portfolio', routes.portfolio);

//"Tell Us About Your Startup" form submission routes
app.get('/apply',routes.submissionForm); //display form
app.post('/apply',routes.createSubmission); //form POST submits here
app.get('/confirmation',routes.confirmation); //general confirmation 
app.get('/rsvp-confirmation',routes.rsvpConfirmation); // rsvp confirmation

// display a single team member page
app.get('/people/:user_name', routes.member);
app.get('/404',routes.errorPage); //display 404 error page

app.use(function(req, res, next){
  res.redirect('/404');
});


// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});