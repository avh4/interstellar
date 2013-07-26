
/**
 * Module dependencies.
 */

if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY
  });
}

var _ = require('underscore');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var uuid = require('node-uuid');
var kue = require('kue');

function createRedis() {
  if (process.env.REDISCLOUD_URL) {
    var rtg   = require("url").parse(process.env.REDISCLOUD_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
    return redis;
  } else {
    return require("redis").createClient();
  }
}
kue.redis.createClient = createRedis;

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
app.use('/kue', kue.app);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("log level", 2);
  io.set("polling duration", 10);
});

var sockets = {};

var games = {};
var openGames = [];
var activeGames = [];

function stepGame(game) {
  sockets[game.p1].emit('update', game.uid);
  // sockets[game.p2].emit('update', game.uid);
  // sockets[game.p3].emit('update', game.uid);
}

var isRunning = false;
var steps = 0;
var startTime;
function startStepLoop() {
  if (isRunning) return;
  console.log("Starting the step loop.");
  isRunning = true;
  steps = 0;
  startTime = new Date().getTime();
  setTimeout(step, 35);
}
function step() {
  activeGames.forEach(stepGame);
  if (activeGames.length > 0) {
    setTimeout(step, 35);
  } else {
    console.log("No active games, stopping the step loop.");
    isRunning = false;
  }

  steps++;
  if (steps % 100 == 0) {
    var ms = new Date().getTime() - startTime;
    console.log("Running " + activeGames.length + " games, FPS: " + (steps * 1000/ ms));
  }
}


jobs.process('start game', function(job, done) {
  var game = games[job.data.game];

  openGames = _.without(openGames, game);
  activeGames.push(game);

  console.log("Starting game " + game.uid);
  sockets[game.p1].emit('start', game.uid);
  // sockets[game.p2].emit('start', game.uid);
  // sockets[game.p3].emit('start', game.uid);

  startStepLoop();

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

function terminateGame(game) {
  console.log("Terminating game " + game.uid);
  activeGames = _.without(activeGames, game);
}

function playerDisconnected(userId) {
  console.log("Player disconnected " + userId);
  var game = _.find(activeGames, function(game) { return game.p1 == userId; });
  terminateGame(game);
}

io.sockets.on('connection', function (socket) {
  var userId = uuid.v1();
  sockets[userId] = socket;
  var joinInfo = joinGame(userId);
  socket.emit('joined', joinInfo);
  var game = games[joinInfo.game];
  if (game.p1) {
    jobs.create('start game', {
        title: 'start game ' + game.uid
      , game: game.uid
    }).save();
  }
  socket.on('my other event', function (data) {
    console.log("got data from " + userId + ":" + data);
  });
  socket.on('disconnect', function() {
    playerDisconnected(userId);
  });
});