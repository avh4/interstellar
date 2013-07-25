require(["domReady", "game"], function(domReady, Game) {
  domReady(function() {
    var game = new Game('canvas_container', 800, 600);
    setInterval(function() { game.update(); }, 35);
  });
});