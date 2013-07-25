define(['coordinate_system', 'system', 'coordinate', 'player'],
function(CoordinateSystem, System, Coordinate, Player) {
  function Game() {
    this.player = new Player();
    this.systems = [
      new System("Solar System",    "G", new Coordinate([ 0,  0,  0], 0,  0     ),     0, 1    , 8),
      new System("Alpha Centauri",  "G", new Coordinate([14, 29, 43], 0,  4.2421), -3678, 2.130, 1),
      new System("Barnard's Star",  "M", new Coordinate([17, 57, 49], 0,  5.9630),  -798, 0.144, 0),
      new System("WISE 1049-5319",  "L", new Coordinate([10, 49, 16], 0,  6.52  ), -2759, 0    , 0),
      new System("Wolf 359",        "M", new Coordinate([10, 56, 29], 0,  7.7825), -3842, 0.09 , 0),
      new System("Lalande 21185",   "M", new Coordinate([11,  3, 20], 0,  8.2905),  -580, 0.46 , (1)),
      new System("Sirius",          "A", new Coordinate([ 6, 45,  9], 0,  8.5828),  -546, 2.998, 0),
      new System("Luyten 726-8",    "M", new Coordinate([ 1, 39,  1], 0,  8.7280),  3321, 0.202, (2)),
      new System("Ross 154",        "M", new Coordinate([18, 49, 49], 0,  9.6813),   637, 0.17 , 0),
      new System("Ross 248",        "M", new Coordinate([23, 41, 55], 0, 10.322 ),   111, 0.136, 0),
      new System("WISE 1506+7027",  "T", new Coordinate([15,  6, 50], 0, 10.521 ), -1241, 0    , 0),
      new System("Epsilon Eridani", "K", new Coordinate([ 3, 32, 56], 0, 10.522 ),  -975, 0.82 , 2),
      new System("Lacaille 9352",   "M", new Coordinate([23,  5, 52], 0, 10.742 ),  6768, 0.503, 0),
      new System("Ross 128",        "M", new Coordinate([11, 47, 44], 0, 10.919 ),   605, 0.15 , 0),
      new System("WISE 0350-5658",  "Y", new Coordinate([ 3, 50,  0], 0, 11.208 ),  -125, 0    , 0),
      new System("EZ Aquarii",      "M", new Coordinate([22, 38, 33], 0, 11.266 ),  2314, 0.32 , 0),
    ];
    this.player.toggleOwnership(this.systems[0]);
    this.years = 0;
  }

  Game.prototype.start = function(layer) {
    var width = layer.width;
    var height = layer.height;
    this.coordinateSystem = new CoordinateSystem(width, height, 15);
    var c = this.coordinateSystem;
    var player = this.player;

    layer.add(new Kinetic.Rect({x: 0, y: 0, width: width, height: height, fill: "black"}));
    this.timeLabel = new Kinetic.Text({x: 20, y: height - 20, fill: "white"});
    layer.add(this.timeLabel);
    this.ownedSystemsLabel = new Kinetic.Text({x: 20, y: height - 40, fill: "white"});
    layer.add(this.ownedSystemsLabel);
    this.consumedEnergyLabel = new Kinetic.Text({x: 20, y: height-60, fill: "white"});
    layer.add(this.consumedEnergyLabel);
    this.systems.forEach(function(system) {
      var x = c.x(system);
      var y = c.y(system);
      var color = system.color;
      var r = c.radius(system.radius);
      var group = new Kinetic.Group({x: x, y: y});
      group.add(new Kinetic.Circle({radius: r, fill: color}));
      group.on("click", function() { player.toggleOwnership(system) });
      for (var i = 0; i < system.planets; i++) {
        group.add(new Kinetic.Circle({radius: r + 5 + 3*i, stroke: "grey"}));
      }
      layer.add(group);
      system.e = group;
    });
  }

  Game.prototype.update = function() {
    this.player.update();

    var c = this.coordinateSystem;
    var as = 0.000277777778 / 180 * Math.PI;
    var step = .01;
    this.years = Math.round(100*(this.years + step)) / 100;
    this.timeLabel.setText(this.years + " million years");
    this.systems.forEach(function(system) {
      system.coordinate.ra += system.rad * as * step;
      system.e.setPosition(c.x(system), c.y(system));
    });

    var ownedSystems = _.map(this.player.ownedSystems, function(s) {
      var e = Math.round(100 * s.energy) / 100;
      return s.name + "(" + e + ")"
      });
    this.ownedSystemsLabel.setText(ownedSystems.join(", "));

    var consumed = Math.round(1000 * this.player.consumed) / 1000;
    this.consumedEnergyLabel.setText(consumed + " x 10^30 TJ")
  };

  return Game;
});
