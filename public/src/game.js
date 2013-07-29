define(['coordinate_system', 'player', 'number_formatter', 'ui/percentage_menu'],
function(CoordinateSystem, Player, NumberFormatter, PercentageMenu) {
  var playerHue = 0;
  function playerColor(saturation, lightness) {
    return 'hsl(' + playerHue + ',' + saturation + '%,' + + lightness + '%)';
  }

  function Game() {
    this.views = {};
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
      var topGroup = new Kinetic.Group({x: x, y: y});
      group.add(new Kinetic.Circle({radius: r, fill: color}));
      for (var i = 0; i < system.planets; i++) {
        group.add(new Kinetic.Circle({radius: r + 5 + 3*i, stroke: "grey"}));
      }
      group.add(group.label = new Kinetic.Text({x: -40, y: 40, width: 80, fill: "grey", align: "center"}));
      group.add(group.label2 = new Kinetic.Text({x: -40, y: 55, width: 80, fill: "grey", align: "center"}));
      layer.add(group);
      topGroup.add(menu = new PercentageMenu(x, y, playerHue,
        function(percentages) {
          th.actions.changePercentages(system, percentages);
        }));
      topLayer.add(topGroup);

      topGroup.hide();

      th.views[system.name] = {
        system: group,
        menu: menu,
        labels: {
          mass: group.label,
          output: group.label2
        }
      };

      group.on("mouseover", function() {
        var role = 'p1';
        var player = th.model[role];
        if (!!player.tasks[system.name]) {
          topGroup.setOpacity(0);
          topGroup.setScale(.9, .9);
          topGroup.show();
          topGroup.moveToTop();
          new Kinetic.Tween({
            node: topGroup,
            duration: .3, easing: Kinetic.Easings.EaseOut,
            opacity: 1,
            scaleX: 1,
            scaleY: 1
          }).play();
        }
      });
      topGroup.on("mouseover", function() {
        topGroup.show();
        topGroup.moveToTop();
      });
      topGroup.on("mouseout", function() {
        topGroup.hide();
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
      var view = th.views[system.name];
      view.labels.mass.setText(NumberFormatter.format(system.mass_g_e33, 33, 5, "g"));
      view.labels.output.setText(NumberFormatter.format(system.output_W_e26, 26, 3, "W"));
      for (var taskName in player.tasks[system.name]) {
        var task = player.tasks[system.name][taskName];
        if (!!task) {
          var text = task.description;
          if (!!task.progress) {
            text += " (" + (task.progress * 100).toFixed(1) + "%)";
          }
          view.menu.buttons[taskName].detailText.setText(text);
        } else {
          view.menu.buttons[taskName].detailText.setText("");
        }
      }
    });

    this.consumedEnergyLabel.setText("Your civilization has expended " + NumberFormatter.format(this.model.p1.harnessedEnergy_J_e41, 41, 3, "J") + " in its entire history");
    this.currentCaptureLabel.setText("Your civilzation is currently making use of " + NumberFormatter.format(this.model.p1.currentCapture_W_e26, 26, 5, "W"));
    var K = ((Math.log(this.model.p1.currentCapture_W_e26)/Math.log(10) + 26) - 6) / 10;
    this.label5.setText("K = " + K.toFixed(3));
  };

  return Game;
});
