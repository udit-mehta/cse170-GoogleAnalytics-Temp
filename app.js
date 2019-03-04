
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var profile = require('./routes/profile');
var signup = require('./routes/signup');
var help = require('./routes/help');
var playback = require('./routes/playback');
var playbackA = require('./routes/playbackA');
var playbackB = require('./routes/playbackB');
var playbackC = require('./routes/playbackC');
var playbackD = require('./routes/playbackD');
var liveplayback = require('./routes/liveplayback');
var signin = require('./routes/signin');
const translate = require('@vitalets/google-translate-api');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/signin', signin.view);
app.get('/', index.view);
app.get('/playback', playback.view);
app.get('/playbackA', playbackA.view);
app.get('/playbackB', playbackB.view);
app.get('/playbackC', playbackC.view);
app.get('/playbackD', playbackD.view);
app.get('/liveplayback', liveplayback.view);
app.get('/help', help.view);
app.get('/signup', signup.view);
app.get('/profile', profile.view);

//app.post('/profile', profile.updateProfile);

app.post('/profile', function(req, res) {
  let data = require('./data.json');
  var fs = require('fs');
  var fileName = './data.json';
  var file = require(fileName);
  if( req.body.email )
    data.email = req.body.email;
  if( req.body.password )
    data.password = req.body.password;
  if( req.body.university )
    data.universityName = req.body.university;
  if( req.body.languages )
    {
      file.languages = [];
      req.body.languages.forEach(function (language) {
        file.languages.push({"name": language});
      });
    }
  fs.writeFileSync(fileName, JSON.stringify(file));
  res.render('index', data);
});

app.post('/', function(req, res) {
  let data = require('./data.json');
  var fs = require('fs');
  var fileName = './data.json';
  var file = require(fileName);
  if( req.body.email )
    data.email = req.body.email;
  if( req.body.password )
    data.password = req.body.password;
  if (req.body.profilePicture)
    data.profileURL = req.body.profilePicture;
  fs.writeFileSync(fileName, JSON.stringify(file));
  res.render('index', data);
});

// Example route
// app.get('/users', user.list);

app.get('/translate', function(req, res){
  translate( req.query.speechText, {from: req.query.fromLang, to: req.query.toLang }).then(result => {
      res.send( result.text );
      }).catch(err => {
          res.send( err );
      });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
