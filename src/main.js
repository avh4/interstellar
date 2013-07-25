require(["domReady", "game", "title"], function(domReady, Game, Title) {
  var game = new Game();
  var title = new Title();
  var paper;
  var intervalId;

  var container = { };
  container.switchTo = function(screen) {
    clearInterval(intervalId);
    intervalId = null;
    paper.clear();

    switch(screen) {
      case "game":
        game.start(paper, container);
        intervalId = setInterval(function() { game.update(); }, 35);
        break;
      case "title":
        title.start(paper, container);
        break;
    }
  }

  domReady(function() {
    paper = new Raphael(document.getElementById('canvas_container'), 800, 600);
    container.switchTo("title");
  });
});