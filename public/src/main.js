require(["domReady", "game", "title", "waiting_for_players", "game_manager"],
function(domReady, Game, Title, WaitingForPlayers, GameManager) {
  var game = new Game();
  var gm;
  var title;
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
  }

  domReady(function() {
    soundManager.setup({
      url: '/swf',
      preferFlash: false,
      onready: function() {
        soundManager.createSound({id:'title',url:'/assets/title.mp3', volume: 50});
        function loop() {
          soundManager.play('title', {position: 65678, onfinish: function() { loop(); }});
        }
        soundManager.play('title', {onfinish: function() { loop(); }});
      }
    });
    
    stage = new Kinetic.Stage({container: 'container', width: 800, height: 600});
    gm = new GameManager(game, stage);
    title = new Title(gm);
    container.switchTo("title");
  });
});