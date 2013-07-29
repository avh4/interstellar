define(['ui/action_button'], function(ActionButton) {
  var buttonSize = 34;
  var hues = { stellarMining: 0, travel: 120, planetaryMining: 240 };
  var titles = { stellarMining: "Stellar Mining", travel: "Interstellar Travel", planetaryMining: "Planetary Mining" };
  var levels = { stellarMining: 0.4, travel: 1, planetaryMining: 0.7};

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

  function PercentageMenu(x, y, playerHue, updateFn) {
    var percentages = { travel: 0, planetaryMining: 0, stellarMining: 0 };
    Kinetic.Group.call(this);
    var menuSize = 200;
    this.add(new Kinetic.Circle({radius: menuSize/2, fill: "#333", opacity: 0.6}));
    this.add(new Kinetic.Circle({radius: menuSize/2, stroke: "white"}));
    var buttons = {};
    var wedges = {};
    var tasks = percentages;
    var startingPercent = {};
    
    var updatePercent = function() {
      var startPercent = 0;
      for(var task in tasks) {
        var percent = percentages[task];
        wedges[task].setAngleDeg(360 * percent);
        wedges[task].setRotationDeg(360 * startPercent - 90);
        buttons[task].inner.setText(Math.round(percent*100) + "%");
        var x = buttons[task].attrs.x;
        var y = buttons[task].attrs.y;
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        x = r*Math.cos((percent + startPercent -.25) * 2 * Math.PI);
        y = r*Math.sin((percent + startPercent -.25) * 2 * Math.PI);
        buttons[task].setPosition(x, y);
        startingPercent[task] = startPercent;
        startPercent += percent;
      }
    };
    
    var th = this;
    var makeTask = function(task) {
      wedges[task] = new Kinetic.Wedge({radius: menuSize/2, fill: hsl(hues[task], 80, 40), opacity: 0.5});
      th.add(wedges[task]);
      wedges[task].setZIndex(-2);

      var r = menuSize/2 * levels[task];
      buttons[task] = new ActionButton(titles[task], hues[task], {x: 0, y: -r, draggable: true, dragBoundFunc: ringDragBounds(r, x, y)});
      th.add(buttons[task]);

      buttons[task].on("dragstart", function() {
      });
      buttons[task].on("dragmove", function() {
        var dx = buttons[task].attrs.x;
        var dy = buttons[task].attrs.y;
        var radians = Math.atan2(dx, dy);
        var percent = .5 - radians / (2*Math.PI) - startingPercent[task];
        percentages[task] = percent;
        updatePercent();
      });
      buttons[task].on("dragend", function() {
        updateFn(percentages);
      });
    }

    for (var task in tasks) {
      makeTask(task);
    }
    
    updatePercent();
  }

  PercentageMenu.prototype = Object.create(Kinetic.Group.prototype);

  return PercentageMenu;
});
