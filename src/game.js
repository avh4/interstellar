Game = {
  systems: [
    { name: "Solar System", planets: 8 },
    { name: "Alpha Centauri", planets: 1 },
    { name: "Barnard's Star" },
    { name: "WISE 1049-5319" },
    { name: "Wold 359" },
    { name: "Lalande 21185" },
    { name: "Sirius" },
    { name: "Luyten 726-8" },
    { name: "Ross 154" },
    { name: "Ross 248" },
    { name: "WISE 1506+7027" },
    { name: "Epsilon Eridani", planets: 2 },
    { name: "Lacaille 9352" },
    { name: "Ross 128" },
    { name: "WISE 0350-5658" },
    { name: "EZ Aquarii" },
  ],

  width: 800,
  height: 600,

  start: function() {
    Crafty.init(Game.width, Game.height);
    Crafty.background('black');

    var x = 20;
    var y = Game.height/2;
    Game.systems.forEach(function(system) {
      Crafty.e('2D, Canvas, Color').attr({x: x, y: y, w: 3, h: 3}).color('white');
      x += 20;
    });
  }
}