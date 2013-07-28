define(['coordinate_system', 'player', 'number_formatter', 'ui/action_button'],
function(CoordinateSystem, Player, NumberFormatter, ActionButton) {
  var playerHue = 0;
  function playerColor(saturation, lightness) {
    return 'hsl(' + playerHue + ',' + saturation + '%,' + + lightness + '%)';
  }

  function ringDragBounds(radius) {
    return function(pos) {
      var x = 400;
      var y = 300;
      var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
      return {
        x: (pos.x - x) * scale + x,
        y: (pos.y - y) * scale + y
      }
    };
  }

  function Game() {
    this.groups = {};
  }

  Game.prototype.start = function(baseLayer) {
    var width = baseLayer.width;
    var height = baseLayer.height;
    var layer = new Kinetic.Group();
    var topLayer = new Kinetic.Group();
    baseLayer.add(layer);
    baseLayer.add(topLayer);
    topLayer.setZIndex(10);
    this.coordinateSystem = new CoordinateSystem(width, height, 18);
    var c = this.coordinateSystem;

    layer.add(new Kinetic.Rect({x: 0, y: 0, width: width, height: height, fill: "black"}));
    this.timeLabel = new Kinetic.Text({x: 20, y: height - 20, fill: "white"});
    layer.add(this.timeLabel);
    this.ownedSystemsLabel = new Kinetic.Text({x: 20, y: height - 40, fill: "white"});
    layer.add(this.ownedSystemsLabel);
    this.consumedEnergyLabel = new Kinetic.Text({x: 20, y: height-60, fill: "white"});
    layer.add(this.consumedEnergyLabel);
    this.currentCaptureLabel = new Kinetic.Text({x: 20, y: height-80, fill: "white"});
    layer.add(this.currentCaptureLabel);
    this.label5 = new Kinetic.Text({x: 20, y: height-100, fill: "white"});
    layer.add(this.label5);
    var th = this;
    this.model.systems.forEach(function(system) {
      var x = c.x(system);
      var y = c.y(system);
      var color = system.color;
      var r = c.radius(system.radius);
      var group = new Kinetic.Group({x: x, y: y});
      console.log({x: x, y: y});
      var topGroup = new Kinetic.Group({x: x, y: y});
      group.add(new Kinetic.Circle({radius: r, fill: color}));
      for (var i = 0; i < system.planets; i++) {
        group.add(new Kinetic.Circle({radius: r + 5 + 3*i, stroke: "grey"}));
      }
      group.add(group.label = new Kinetic.Text({x: -40, y: 40, width: 80, fill: "grey", align: "center"}));
      group.add(group.label2 = new Kinetic.Text({x: -40, y: 55, width: 80, fill: "grey", align: "center"}));
      group.add(group.taskLabel = new Kinetic.Text({x: -40, y: 70, width: 80, fill: playerColor(100, 88), align: "center"}));
      layer.add(group);
      topGroup.add(topGroup.buttons = new Kinetic.Group());
      topLayer.add(topGroup);

      var menuSize = 200;
      topGroup.buttons.add(new Kinetic.Circle({radius: menuSize/2, fill: "#333", opacity: 0.4}));
      topGroup.buttons.add(new Kinetic.Circle({radius: menuSize/2, stroke: "white"}));
      topGroup.buttons.hide();

      var stellarMiningButton = new ActionButton("Stellar Mining", playerHue, {x: 0, y: -menuSize/2, draggable: true, dragBoundFunc: ringDragBounds(menuSize/2)});
      topGroup.buttons.add(stellarMiningButton);

      stellarMiningButton.on("dragmove", function() {
        var x = 400;
        var y = 300;
        var dx = stellarMiningButton.attrs.x;
        var dy = stellarMiningButton.attrs.y;
        var radians = Math.atan2(dx, dy);
        var percent = .5 - radians / (2*Math.PI);
      });
      stellarMiningButton.on("dragend", function() {
        var x = 400;
        var y = 300;
        var dx = stellarMiningButton.attrs.x;
        var dy = stellarMiningButton.attrs.y;
        var radians = Math.atan2(dx, dy);
        var percent = .5 - radians / (2*Math.PI);
        th.actions.changePercentages(system, { stellarMining: percent});
      });

      th.groups[system.name] = group;
      th.groups[system.name].topGroup = topGroup;

      group.on("mouseover", function() {
        topGroup.buttons.show();
        topGroup.draw();
      });
      topGroup.on("mouseover", function() {
        topGroup.buttons.show();
        topGroup.draw();        
      });
      topGroup.on("mouseout", function() {
        topGroup.buttons.hide();
      });
    });

    // this.player.toggleOwnership(this.systems[0]);
  }

  Game.prototype.update = function(actions) {
    // this.player.update();
    var th = this;
    this.actions = actions;

    var c = this.coordinateSystem;
    var as = 0.000277777778 / 180 * Math.PI;
    var years = Math.round(100*(this.model.time_years_e9*1000)) / 100;
    this.timeLabel.setText(years + " million years have passed");
    var role = 'p1';
    var player = this.model[role];
    this.model.systems.forEach(function(system) {
    //   system.coordinate.ra += system.rad * as * step;
    //   system.e.setPosition(c.x(system), c.y(system));
      var group = th.groups[system.name];
      group.label.setText(NumberFormatter.format(system.mass_g_e33, 33, 5, "g"));
      group.label2.setText(NumberFormatter.format(system.output_W_e26, 26, 3, "W"));
      var task = player.tasks[system.name];
      if (!!task) {
        var text = task.description;
        if (!!task.progress) {
          text += " (" + (task.progress * 100).toFixed(1) + "%)";
        }
        group.taskLabel.setText(text);
      }
    });

    // var ownedSystems = _.map(this.player.ownedSystems, function(s) {
    //   var e = Math.round(100 * s.energy) / 100;
    //   return s.name + "(" + e + ")"
    //   });
    // this.ownedSystemsLabel.setText(ownedSystems.join(", "));

    this.consumedEnergyLabel.setText("Your civilization has expended " + NumberFormatter.format(this.model.p1.harnessedEnergy_J_e41, 41, 3, "J") + " in its entire history");
    this.currentCaptureLabel.setText("Your civilzation is currently making use of " + NumberFormatter.format(this.model.p1.currentCapture_W_e26, 26, 5, "W"));
    var K = ((Math.log(this.model.p1.currentCapture_W_e26)/Math.log(10) + 26) - 6) / 10;
    this.label5.setText("K = " + K.toFixed(3));
  };

  return Game;
});
