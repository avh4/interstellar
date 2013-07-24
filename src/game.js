define(['coordinate_system', 'system', 'coordinate'],
function(CoordinateSystem, System, Coordinate) {
  return {
    systems: [
      new System("Solar System",    "G", new Coordinate([ 0,  0,  0], 0,  0     ), 8),
      new System("Alpha Centauri",  "G", new Coordinate([14, 29, 43], 0,  4.2421), 1),
      new System("Barnard's Star",  "M", new Coordinate([17, 57, 49], 0,  5.9630), 0),
      new System("WISE 1049-5319",  "L", new Coordinate([10, 49, 16], 0,  6.52  ), 0),
      new System("Wold 359",        "M", new Coordinate([10, 56, 29], 0,  7.7825), 0),
      new System("Lalande 21185",   "M", new Coordinate([11,  3, 20], 0,  8.2905), 0),
      new System("Sirius",          "A", new Coordinate([ 6, 45,  9], 0,  8.5828), 0),
      new System("Luyten 726-8",    "M", new Coordinate([ 1, 39,  1], 0,  8.7280), 0),
      new System("Ross 154",        "M", new Coordinate([18, 49, 49], 0,  9.6813), 0),
      new System("Ross 248",        "M", new Coordinate([23, 41, 55], 0, 10.322 ), 0),
      new System("WISE 1506+7027",  "T", new Coordinate([15,  6, 50], 0, 10.521 ), 0),
      new System("Epsilon Eridani", "K", new Coordinate([ 3, 32, 56], 0, 10.522 ), 2),
      new System("Lacaille 9352",   "M", new Coordinate([23,  5, 52], 0, 10.742 ), 0),
      new System("Ross 128",        "M", new Coordinate([11, 47, 44], 0, 10.919 ), 0),
      new System("WISE 0350-5658",  "Y", new Coordinate([ 3, 50,  0], 0, 11.208 ), 0),
      new System("EZ Aquarii",      "M", new Coordinate([22, 38, 33], 0, 11.266 ), 0),
    ],

    coordinateSystem: new CoordinateSystem(800, 600, 15),

    start: function() {
      var c = this.coordinateSystem;
      var paper = new Raphael(document.getElementById('canvas_container'),
        c.width, c.height);
      paper.rect(0, 0, c.width, c.height)
        .attr({fill: "black"});

      this.systems.forEach(function(system) {
        var x = c.x(system);
        var y = c.y(system);
        var color = system.color;
        var r = c.radius(system.radius);
        paper.circle(x, y, r).attr({fill: color, stroke: "none"})
          .glow({color: color, width: 100});
      })
    }
  };
});
