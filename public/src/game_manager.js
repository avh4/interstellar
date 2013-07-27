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
    });
    socket.on('start', function(data) {
      game.model = data;
      callback();
    });

    var actions = {
      stellarMining: function(system) {
        console.log("Sending player action: p1: stellarMining: " + system.name);
        socket.emit('action', { player: 'p1', action: 'stellarMining', system: system.name });
      }
    };

    var debugCount = 0;
    socket.on('update', function(data) {
      debugCount++;
      if (debugCount % 100 == 1) {
        console.log(data);
      }
      game.model = data;
      game.update(actions);
      stage.draw();
    });
  }

  return GameManager;
});