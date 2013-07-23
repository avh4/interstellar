function ra(hours, minutes, seconds) {
  return 0;
}

Game = {
  systems: [
    { name: "Solar System",   p:{ra:ra(0, 0, 0), dec: 0, distance:  0      }, planets: 8 },
    { name: "Alpha Centauri", p:{ra:ra(0, 0, 0), dec: 0, distance:  4.2421 }, planets: 1 },
    { name: "Barnard's Star", p:{ra:ra(0, 0, 0), dec: 0, distance:  5.9630 } },
    { name: "WISE 1049-5319", p:{ra:ra(0, 0, 0), dec: 0, distance:  6.52   } },
    { name: "Wold 359",       p:{ra:ra(0, 0, 0), dec: 0, distance:  7.7825 } },
    { name: "Lalande 21185",  p:{ra:ra(0, 0, 0), dec: 0, distance:  8.2905 } },
    { name: "Sirius",         p:{ra:ra(0, 0, 0), dec: 0, distance:  8.5828 } },
    { name: "Luyten 726-8",   p:{ra:ra(0, 0, 0), dec: 0, distance:  8.7280 } },
    { name: "Ross 154",       p:{ra:ra(0, 0, 0), dec: 0, distance:  9.6813 } },
    { name: "Ross 248",       p:{ra:ra(0, 0, 0), dec: 0, distance: 10.322  } },
    { name: "WISE 1506+7027", p:{ra:ra(0, 0, 0), dec: 0, distance: 10.521  } },
    { name: "Epsilon Eridani",p:{ra:ra(0, 0, 0), dec: 0, distance: 10.522  }, planets: 2 },
    { name: "Lacaille 9352",  p:{ra:ra(0, 0, 0), dec: 0, distance: 10.742  } },
    { name: "Ross 128",       p:{ra:ra(0, 0, 0), dec: 0, distance: 10.919  } },
    { name: "WISE 0350-5658", p:{ra:ra(0, 0, 0), dec: 0, distance: 11.208  } },
    { name: "EZ Aquarii",     p:{ra:ra(0, 0, 0), dec: 0, distance: 11.266  } },
  ],

  width: 800,
  height: 600,
  max_range: 12,

  start: function() {
    Crafty.init(Game.width, Game.height);
    Crafty.background('black');

    var x = 20;
    var y = Game.height/2;
    Game.systems.forEach(function(system) {
      Crafty.e('System').at(system.p);
      x += 20;
    });
  }
}