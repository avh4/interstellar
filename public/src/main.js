require(["domReady", "game", "title"], function(domReady, Game, Title) {
  var game = new Game();
  var title = new Title();
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

    var socket = io.connect('/');
      socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
      });
  });
});