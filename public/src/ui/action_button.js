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
      opacity: "0.4"
    }));
    this.add(frame = new Kinetic.Circle({
      radius: buttonSize/2,
      stroke: "white",
      strokeWidth: 3
    }));
    this.add(text = new Kinetic.Text({
      x: -buttonSize/2,
      y: -buttonSize/2,
      width: buttonSize,
      height: buttonSize,
      align: "center",
      fill: "white",
      text: title
    }));

    this.on("mouseover", function() {
      frame.setStroke(hsl(hue, 100, 50));
      this.draw();
    });

    this.on("mouseout", function() {
      frame.setStroke("white");
      this.draw();
    });
  }

  ActionButton.prototype = Object.create(Kinetic.Group.prototype);

  return ActionButton;
});
