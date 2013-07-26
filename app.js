
/**
 * Module dependencies.
 */

var _ = require('underscore');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var uuid = require('node-uuid');
var kue = require('kue');

var app = express();
var jobs = kue.createQueue();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
var io = socketio.listen(server);
kue.app.listen(3001);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("log level", 2);
  io.set("polling duration", 10);
});

var sockets = {};

var games = {};
var openGames = [];
var activeGames = [];


jobs.process('start game', function(job, done){
  var game = games[job.data.game];

  openGames = _.without(openGames, game);
  activeGames.push(game);

  console.log("Starting game " + game.uid);
  sockets[game.p1].emit('start', game.uid);
  sockets[game.p2].emit('start', game.uid);
  sockets[game.p3].emit('start', game.uid);

  done();
});

function joinGame(userId) {
  if (openGames.length == 0) {
    var uid = uuid.v1();
    var game = { uid: uid };
    console.log("Created game: " + game.uid);
    games[uid] = game;
    openGames.push(game);
  }
  var game = openGames[0];
  var role;
  if (!game.p1) {
    role = "p1";
  } else if (!game.p2) {
    role = "p2";
  } else {
    role = "p3";
  }
  game[role] = userId;
  console.log("Player " + userId + " joined " + game.uid + " as " + role);
  return { game: game.uid, role: role};
}

io.sockets.on('connection', function (socket) {
  var userId = uuid.v1();
  sockets[userId] = socket;
  var joinInfo = joinGame(userId);
  socket.emit('joined', joinInfo);
  var game = games[joinInfo.game];
  if (game.p3) {
    jobs.create('start game', {
        title: 'start game ' + game.uid
      , game: game.uid
    }).save();
  }
  socket.on('my other event', function (data) {
    console.log("got data from " + userId + ":" + data);
  });
});