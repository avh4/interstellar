define([], function() {
  function GameManager() {
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
    })
  }

  return GameManager;
});