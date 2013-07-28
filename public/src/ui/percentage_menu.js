define(['ui/action_button'], function(ActionButton) {
  var buttonSize = 34;
  var hues = { stellarMining: 0 }

  function hsl(hue, saturation, lightness) {
    return 'hsl(' + hue + ',' + saturation + '%,' + + lightness + '%)';
  }
  
  function ringDragBounds(radius, x, y) {
    return function(pos) {
      var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
      return {
        x: (pos.x - x) * scale + x,
        y: (pos.y - y) * scale + y
      }
    };
  }

  function PercentageMenu(x, y, playerHue, percentages, updateFn) {
    Kinetic.Group.call(this);
    var menuSize = 200;
    this.add(new Kinetic.Circle({radius: menuSize/2, fill: "#333", opacity: 0.6}));
    this.add(new Kinetic.Circle({radius: menuSize/2, stroke: "white"}));
    var buttons = {};
    var wedges = {};

    var task = 'stellarMining';
    wedges[task] = new Kinetic.Wedge({radius: menuSize/2, fill: hsl(hues[task], 80, 40), opacity: 0.4, rotationDeg: -90});
    this.add(wedges[task]);
    
    buttons[task] = new ActionButton("Stellar Mining", playerHue, {x: 0, y: -menuSize/2, draggable: true, dragBoundFunc: ringDragBounds(menuSize/2, x, y)});
    this.add(buttons[task]);
    
    var updatePercent = function() {
      var dx = buttons[task].attrs.x;
      var dy = buttons[task].attrs.y;
      var radians = Math.atan2(dx, dy);
      var percent = .5 - radians / (2*Math.PI);
      percentages[task] = percent;
      wedges[task].setAngleDeg(360 * percent);
      buttons[task].inner.setText(Math.round(percent*100) + "%");
    };

    buttons[task].on("dragmove", updatePercent);
    buttons[task].on("dragend", function() {
      updatePercent();
      updateFn();
    });
  }

  PercentageMenu.prototype = Object.create(Kinetic.Group.prototype);

  return PercentageMenu;
});
