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
      fill: hsl(hue, 50, 40)
    }));
    this.add(frame = new Kinetic.Circle({
      radius: buttonSize/2,
      stroke: hsl(hue, 100, 50),
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
      frame.setStroke(hsl(hue, 100, 95));
      background.setFill(hsl(hue, 90, 80));
    });

    this.on("mouseout", function() {
      frame.setStroke(hsl(hue, 100, 50));
      background.setFill(hsl(hue, 50, 40));
    });
  }

  ActionButton.prototype = Object.create(Kinetic.Group.prototype);

  return ActionButton;
});
