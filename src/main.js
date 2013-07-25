require(["domReady", "game"], function(domReady, Game) {
  domReady(function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 800, 600);
    var game = new Game(paper);
    setInterval(function() { game.update(); }, 35);
  });
});