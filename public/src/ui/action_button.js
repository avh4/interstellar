define([], function() {
  var buttonSize = 34;

  function hsl(hue, saturation, lightness) {
    return 'hsl(' + hue + ',' + saturation + '%,' + + lightness + '%)';
  }

  function ActionButton(title, hue, attr) {
    Kinetic.Group.call(this, attr);
    var th = this;
    var frame, background, text;
    this.add(background = new Kinetic.Circle({
      radius: buttonSize/2,
      fill: "#333",
      opacity: 0.7
    }));
    this.add(frame = new Kinetic.Circle({
      radius: buttonSize/2,
      stroke: "white",
      strokeWidth: 3
    }));
    this.add(text = new Kinetic.Text({
      x: buttonSize/2 + 4,
      y: -7,
      align: "left",
      fill: "white",
      text: title
    }));
    this.add(this.inner = inner = new Kinetic.Text({
      x: -buttonSize/2,
      y: -7,
      width: buttonSize,
      align: "center",
      fill: "#333"
    }))

    this.on("mouseover", function() {
      frame.setStroke("white");
      background.setOpacity(1);
      background.setFill(hsl(hue, 90, 80));
      this.draw();
    });

    this.on("mouseout", function() {
      frame.setStroke(hsl(hue, 100, 50));
      background.setOpacity(0.7);
      background.setFill("#333");
      this.draw();
    });
  }

  ActionButton.prototype = Object.create(Kinetic.Group.prototype);

  return ActionButton;
});
