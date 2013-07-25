define([], function() {
  function WaitingForPlayers() {
  }

  WaitingForPlayers.prototype.start = function(layer, container) {
    var width = layer.width;
    var height = layer.height;

    var t = new Kinetic.Text({
      x: 40, y: 465, text: "Waiting for players...", fontSize: 50, fontFamily: "serif", fill: "white"
    });
    layer.add(t);
  }

  WaitingForPlayers.prototype.update = function() {
  }

  return WaitingForPlayers;
})