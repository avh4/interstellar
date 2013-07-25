require(["domReady", "game"], function(domReady, Game) {
  var game = new Game();

  domReady(function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 800, 600);
    game.start(paper);
    setInterval(function() { game.update(); }, 35);
  });
});