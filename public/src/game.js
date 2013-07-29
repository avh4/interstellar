define(['coordinate_system', 'player', 'number_formatter', 'ui/percentage_menu', 'ui/SystemInfo'],
function(CoordinateSystem, Player, NumberFormatter, PercentageMenu, SystemInfo) {
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
    var bottomLayer = new Kinetic.Group();
    var layer = new Kinetic.Group();
    var topLayer = new Kinetic.Group();
    baseLayer.add(bottomLayer);
    baseLayer.add(layer);
    baseLayer.add(topLayer);
    this.coordinateSystem = new CoordinateSystem(width, height, 18);
    var c = this.coordinateSystem;
    
    // baseLayer.add(new Kinetic.Rect({x: 0, y: 0, width: width, height: height, fill: "black"}));
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
    
    var arrowGroup = new Kinetic.Group();
    arrowGroup.add(a1 = new Kinetic.Polygon({points: [0,0, 10,0, 20,20, 10,40, 0,40, 10,20, 0,0], fill: playerColor(80, 70)}));
    arrowGroup.add(a2 = new Kinetic.Polygon({points: [0,0, 10,0, 20,20, 10,40, 0,40, 10,20, 0,0], fill: playerColor(80, 70), x: 30}));
    arrowGroup.add(a3 = new Kinetic.Polygon({points: [0,0, 10,0, 20,20, 10,40, 0,40, 10,20, 0,0], fill: playerColor(80, 70), x: 60}));
    arrowGroup.setOffset(45, 20);
    layer.add(arrowGroup);
    new Kinetic.Animation(function(frame) {
      a1.setOpacity(0.8 + 0.2 * Math.sin(frame.time * 2 * Math.PI / 1000));
      a2.setOpacity(0.8 + 0.2 * Math.sin(frame.time * 2 * Math.PI / 1000 - 2/6*Math.PI));
      a3.setOpacity(0.8 + 0.2 * Math.sin(frame.time * 2 * Math.PI / 1000 - 4/6*Math.PI));
    }, baseLayer).start();
    this.arrowGroup = arrowGroup;
    arrowGroup.hide();
    this.positionArrowGroup = function(s1, s2) {
      var dx = c.x(s2)-c.x(s1);
      var dy = c.y(s2)-c.y(s1);
      var deg = 90 - Math.atan2(dx, dy) * 180 / Math.PI;
      arrowGroup.setRotationDeg(deg);
      arrowGroup.setPosition((c.x(s2) + c.x(s1))/2, (c.y(s2) + c.y(s1))/2)
      var pxs = Math.sqrt(dx*dx + dy*dy);
      arrowGroup.setScale(.5 * pxs / 90);
    }
    
    this.systemsReference = this.model.systems;
    this.model.systems.forEach(function(system) {
      var x = c.x(system);
      var y = c.y(system);
      var color = system.color;
      var r = c.radius(system.radius);
      
      bottomLayer.add(ownership = new Kinetic.Circle({x: x, y: y, radius: 16*r, fill: playerColor(70, 20)}));
      ownership.hide();

      var group = new Kinetic.Group({x: x, y: y});
      var topGroup = new Kinetic.Group({x: x, y: y});
      group.add(new Kinetic.Circle({radius: r, fill: color}));
      for (var i = 0; i < system.planets; i++) {
        group.add(new Kinetic.Circle({radius: r + 5 + 3*i, stroke: "grey"}));
      }
      var dx = system.adjustLabel[0];
      var dy = system.adjustLabel[1];
      group.add(group.label = new Kinetic.Text({x: -40+dx, y: 15+dy, width: 80, fill: "grey", align: "center"}));
      group.add(group.label2 = new Kinetic.Text({x: -40+dx, y: 30+dy, width: 80, fill: "grey", align: "center"}));
      layer.add(group);
      topGroup.add(menu = new PercentageMenu(x, y, system, playerHue,
        function(percentages) {
          th.actions.changePercentages(system, percentages);
        }));
      topGroup.add(noMenu = new SystemInfo(x, y, system));
      topLayer.add(topGroup);

      topGroup.hide();

      th.views[system.name] = {
        system: group,
        menu: menu,
        ownership: ownership,
        labels: {
          mass: group.label,
          output: group.label2
        }
      };

      group.on("mouseover", function() {
        var m = menu;
        var nm = noMenu;
        return function() {
        var role = 'p1';
        var player = th.model[role];
        if (!!player.tasks[system.name]) {
          m.show();
          nm.hide();
        } else {
          m.hide();
          nm.show();
        }
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
      }}());
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
      if (!!player.tasks[system.name]) {
        view.ownership.show();
      } else {
        view.ownership.hide();
      }
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
    
    if (!!player.colonizations.target) {
      var s1 = this.systemsReference[0];
      var s2 = _.findWhere(this.systemsReference, {name: player.colonizations.target});
      this.positionArrowGroup(s1, s2);
      this.arrowGroup.show();
    } else {
      this.arrowGroup.hide();
    }

    this.consumedEnergyLabel.setText("Your civilization has expended " + NumberFormatter.format(this.model.p1.harnessedEnergy_J_e41, 41, 3, "J") + " in its entire history");
    this.currentCaptureLabel.setText("Your civilzation is currently making use of " + NumberFormatter.format(this.model.p1.currentCapture_W_e26, 26, 5, "W"));
    var K = ((Math.log(this.model.p1.currentCapture_W_e26)/Math.log(10) + 26) - 6) / 10;
    this.label5.setText("K = " + K.toFixed(3));
  };

  return Game;
});
