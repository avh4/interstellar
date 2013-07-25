require(["domReady", "game", "title", "waiting_for_players", "game_manager"],
function(domReady, Game, Title, WaitingForPlayers, GameManager) {
  var gm = new GameManager();
  var game = new Game();
  var title = new Title(gm);
  var stage;
  var anim;

  var container = { };
  container.switchTo = function(screen) {
    if (anim) anim.stop();
    stage.removeChildren();
    var layer = new Kinetic.Layer();
    layer.width = stage.getWidth();
    layer.height = stage.getHeight();

    var current;
    switch(screen) {
      case "game": current = game; break;
      case "title": current = title; break;
      case "waiting_for_players": current = new WaitingForPlayers(); break;
    }
    current.start(layer, container);
    stage.add(layer);
    current.update();
    anim = new Kinetic.Animation(function(frame) {
      current.update();
      stage.draw();
    }, layer);
    anim.start();
  }

  domReady(function() {
    stage = new Kinetic.Stage({container: 'container', width: 800, height: 600});
    container.switchTo("title");
  });
});