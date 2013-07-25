define(['coordinate_system', 'system', 'coordinate', 'player'],
function(CoordinateSystem, System, Coordinate, Player) {
  function Game(containerId, width, height) {
    this.player = new Player();
    this.coordinateSystem = new CoordinateSystem(width, height, 15);
    this.paper = new Raphael(document.getElementById(containerId), width, height)
    this.systems = [
      new System("Solar System",    "G", new Coordinate([ 0,  0,  0], 0,  0     ),     0, 1    , 8),
      new System("Alpha Centauri",  "G", new Coordinate([14, 29, 43], 0,  4.2421), -3678, 2.130, 1),
      new System("Barnard's Star",  "M", new Coordinate([17, 57, 49], 0,  5.9630),  -798, 0.144, 0),
      new System("WISE 1049-5319",  "L", new Coordinate([10, 49, 16], 0,  6.52  ), -2759, 0    , 0),
      new System("Wolf 359",        "M", new Coordinate([10, 56, 29], 0,  7.7825), -3842, 0.09 , 0),
      new System("Lalande 21185",   "M", new Coordinate([11,  3, 20], 0,  8.2905),  -580, 0.46 , 0),
      new System("Sirius",          "A", new Coordinate([ 6, 45,  9], 0,  8.5828),  -546, 2.998, 0),
      new System("Luyten 726-8",    "M", new Coordinate([ 1, 39,  1], 0,  8.7280),  3321, 0.202, 0),
      new System("Ross 154",        "M", new Coordinate([18, 49, 49], 0,  9.6813),   637, 0.17 , 0),
      new System("Ross 248",        "M", new Coordinate([23, 41, 55], 0, 10.322 ),   111, 0.136, 0),
      new System("WISE 1506+7027",  "T", new Coordinate([15,  6, 50], 0, 10.521 ), -1241, 0    , 0),
      new System("Epsilon Eridani", "K", new Coordinate([ 3, 32, 56], 0, 10.522 ),  -975, 0.82 , 2),
      new System("Lacaille 9352",   "M", new Coordinate([23,  5, 52], 0, 10.742 ),  6768, 0.503, 0),
      new System("Ross 128",        "M", new Coordinate([11, 47, 44], 0, 10.919 ),   605, 0.15 , 0),
      new System("WISE 0350-5658",  "Y", new Coordinate([ 3, 50,  0], 0, 11.208 ),  -125, 0    , 0),
      new System("EZ Aquarii",      "M", new Coordinate([22, 38, 33], 0, 11.266 ),  2314, 0.32 , 0),
    ];
    this.paper.rect(0, 0, width, height).attr({fill: "black"});
    this.timeLabel = this.paper.text(200, height - 20, "0 million years").attr({fill: "white"});
    this.ownedSystemsLabel = this.paper.text(200, height - 40, "").attr({fill: "white"});
    this.consumedEnergyLabel = this.paper.text(200, height - 60, "").attr({fill: "white"});
    this.player.toggleOwnership(this.systems[0]);
    this.years = 0;
    this.draw(this.paper);
  }

  Game.prototype.draw = function(paper) {
    var c = this.coordinateSystem;
    var player = this.player;
    this.systems.forEach(function(system) {
      var x = c.x(system);
      var y = c.y(system);
      var color = system.color;
      var r = c.radius(system.radius);
      var circ = paper.circle(x, y, r);
      circ.attr({fill: color, stroke: "none"});
      circ.click(function() { player.toggleOwnership(system) });
      system.e = paper.set();
      system.e.push(circ, circ.glow({color: color, width: 100}));
    });
    
    paper.print(100, 100, "Test string", paper.getFont("Helvetica", 800), 30).attr({fill: "white"});
  }

  Game.prototype.update = function() {
    this.player.update();
    
    var c = this.coordinateSystem;
    var as = 0.000277777778 / 180 * Math.PI;
    var step = .01;
    this.years = Math.round(100*(this.years + step)) / 100;
    this.timeLabel.attr({text: this.years + " million years"});
    this.systems.forEach(function(system) {
      system.coordinate.ra += system.rad * as * step;
      system.e.attr({cx: c.x(system), cy: c.y(system)});
    });
    
    var ownedSystems = _.map(this.player.ownedSystems, function(s) { 
      var e = Math.round(100 * s.energy) / 100;
      return s.name + "(" + e + ")" 
      });
    this.ownedSystemsLabel.attr({text: ownedSystems.join(", ")});
    
    var consumed = Math.round(1000 * this.player.consumed) / 1000;
    this.consumedEnergyLabel.attr({text: consumed + " x 10^30 TJ"})
  };
  
  return Game;
});
