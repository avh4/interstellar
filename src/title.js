define([], function() {
  function Title() {
  }

  Title.prototype.start = function(layer, container) {
    var width = layer.width;
    var height = layer.height;

    var bg = new Image();
    var i = new Kinetic.Image({x: 0, y: -160, width: 800, height: 800 / 838 * 958});
    layer.add(i);
    bg.onload = function() {
      i.setImage(bg);
      layer.draw();
    }
    bg.src = "PIA17171.jpg";

    var t = new Kinetic.Text({
      x: 40, y: 465, text: "Interstellar", fontSize: 50, fontFamily: "serif", fill: "white"
    });
    layer.add(t);

    var button = new Kinetic.Group({x: 500, y: 475});
    var rDraw = new Kinetic.Rect({x: 0, y: 0, width: 200, height: 50, cornerRadius: 15,
      fill: "#7f7f7f", stroke: "black", strokeWidth: 3, opacity: 0.5});
    button.add(rDraw);
    button.add(new Kinetic.Text({text: "Start", fontSize: 30, fontFamily: "serif", fill: "black",
      x: 0, y: 8, width: 200, height: 50, align: "center"}));
    layer.add(button);

    button.on("mouseover", function() {
      rDraw.setOpacity(1);
      rDraw.setFill("white");
      button.draw();
    });

    button.on("mouseout", function() {
      rDraw.setOpacity(.5);
      rDraw.setFill("#7f7f7f");
      button.draw();
    });

    button.on("click", function() {
      container.switchTo("game");
    });
  }

  Title.prototype.update = function() {
  }

  return Title;
})