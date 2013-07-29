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
    if (!createjs.Sound.initializeDefaultPlugins()) {
        document.getElementById("error").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }
    
    var assetsPath = "assets/";
    manifest = [
      { id:"title", src:"title.mp3|title.ogg"}
    ];

    preload = new createjs.LoadQueue();
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", function() {
      createjs.Sound.play("title", {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
      stage = new Kinetic.Stage({container: 'container', width: 800, height: 600});
      gm = new GameManager(game, stage);
      title = new Title(gm);
      container.switchTo("title");
    });
    preload.addEventListener("progress", function(event) {
      console.log(event);
    });
    preload.loadManifest(manifest, true, assetsPath);
  });
});