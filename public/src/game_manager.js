define([], function() {
  var game;
  var stage;

  function GameManager(_game, _stage) {
    game = _game;
    stage = _stage;
  }

  GameManager.prototype.joinGame = function(callback) {
    var socket = io.connect('/');
    socket.on('joined', function (data) {
      console.log("joined game");
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
    socket.on('start', function(data) {
      callback();
    });
    socket.on('update', function(data) {
      game.update();
      stage.draw();
    });
  }

  return GameManager;
});