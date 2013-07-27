define(['coordinate_system', 'player', 'number_formatter'],
function(CoordinateSystem, Player, NumberFormatter) {
  function Game() {
    this.groups = {};
  }

  Game.prototype.start = function(layer) {
    var width = layer.width;
    var height = layer.height;
    this.coordinateSystem = new CoordinateSystem(width, height, 15);
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
      group.add(new Kinetic.Circle({radius: r, fill: color}));
      // group.on("click", function() { player.toggleOwnership(system) });
      for (var i = 0; i < system.planets; i++) {
        group.add(new Kinetic.Circle({radius: r + 5 + 3*i, stroke: "grey"}));
      }
      group.add(group.label = new Kinetic.Text({x: -40, y: 40, width: 80, fill: "grey", align: "center"}));
      group.add(group.label2 = new Kinetic.Text({x: -40, y: 55, width: 80, fill: "grey", align: "center"}));
      layer.add(group);
      th.groups[system.name] = group;
    });

    // this.player.toggleOwnership(this.systems[0]);
  }

  Game.prototype.update = function() {
    // this.player.update();
    var th = this;

    var c = this.coordinateSystem;
    var as = 0.000277777778 / 180 * Math.PI;
    var step = .01;
    var years = Math.round(100*(this.model.time_years_e9 + step)) / 100;
    this.timeLabel.setText(years + " billion years have passed");
    this.model.systems.forEach(function(system) {
    //   system.coordinate.ra += system.rad * as * step;
    //   system.e.setPosition(c.x(system), c.y(system));
      th.groups[system.name].label.setText(NumberFormatter.format(system.mass_g_e33, 33, 5, "g"));
      th.groups[system.name].label2.setText(NumberFormatter.format(system.output_W_e26, 26, 3, "W"));
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
