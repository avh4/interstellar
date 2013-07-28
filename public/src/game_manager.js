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
      changePercentages: function(system, percentages) {
        console.log("Sending player action: p1: changePercentages: " + system.name);
        socket.emit('action', { player: 'p1', action: 'changePercentages', system: system.name, percentages: percentages });
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