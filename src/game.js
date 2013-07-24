function colorForSpectralClass(cl) {
  switch(cl) {
    case "O": return '#9bb0ff'; // blue
    case "B": return '#bbccff'; // blue-white
    case "A": return '#f8f7ff'; // white
    case "F": return '#fcf4d8'; // yellow-white
    case "G": return '#fff2a1'; // yellow
    case "K": return '#ffe46f'; // orange
    case "M": return '#ffa040'; // red
    case "L": return '#ff6060'; // red-brown
    case "T": return '#ff4080'; // brown
    case "Y": return '#9366B4'; // dark brown
    case "D": return '#F0F0F0'; // white dwarf
  }
  return "#444444";
}

function radiusForSpectralClass(cl) {
  switch(cl) {
    case "O": return 6.6;
    case "B": return 1.8;
    case "A": return 1.4;
    case "F": return 1.15;
    case "G": return 0.96;
    case "K": return 0.7;
    case "M": return 0.6; // estimate
    case "L": return 0.5; // estimate
    case "T": return 0.4; // estimate
    case "Y": return 0.3; // estimate
    case "D": return 0.1; // estimate
  }
}

function pixelForCoordinate(p) {
  var x0 = Game.width / 2
  var y0 = Game.height / 2
  var distance = p.distance * Game.width / (2*Game.max_range);
  var dx = Math.cos(p.ra) * distance;
  var dy = Math.sin(p.ra) * distance;
  return [x0 + dx, y0 + dy];
}

function ra(hours, minutes, seconds) {
  return hours * Math.PI / 12;
}

Game = {
  systems: [
    { name: "Solar System",   cl:"G", p:{ra:ra(0, 0, 0), dec: 0, distance:  0      }, planets: 8 },
    { name: "Alpha Centauri", cl:"G", p:{ra:ra(14, 29, 43), dec: 0, distance:  4.2421 }, planets: 1 },
    { name: "Barnard's Star", cl:"M", p:{ra:ra(17, 57, 49), dec: 0, distance:  5.9630 } },
    { name: "WISE 1049-5319", cl:"L", p:{ra:ra(10, 49, 16), dec: 0, distance:  6.52   } },
    { name: "Wold 359",       cl:"M", p:{ra:ra(10, 56, 29), dec: 0, distance:  7.7825 } },
    { name: "Lalande 21185",  cl:"M", p:{ra:ra(11,  3, 20), dec: 0, distance:  8.2905 } },
    { name: "Sirius",         cl:"A", p:{ra:ra( 6, 45,  9), dec: 0, distance:  8.5828 } },
    { name: "Luyten 726-8",   cl:"M", p:{ra:ra( 1, 39,  1), dec: 0, distance:  8.7280 } },
    { name: "Ross 154",       cl:"M", p:{ra:ra(18, 49, 49), dec: 0, distance:  9.6813 } },
    { name: "Ross 248",       cl:"M", p:{ra:ra(23, 41, 55), dec: 0, distance: 10.322  } },
    { name: "WISE 1506+7027", cl:"T", p:{ra:ra(15,  6, 50), dec: 0, distance: 10.521  } },
    { name: "Epsilon Eridani",cl:"K", p:{ra:ra( 3, 32, 56), dec: 0, distance: 10.522  }, planets: 2 },
    { name: "Lacaille 9352",  cl:"M", p:{ra:ra(23,  5, 52), dec: 0, distance: 10.742  } },
    { name: "Ross 128",       cl:"M", p:{ra:ra(11, 47, 44), dec: 0, distance: 10.919  } },
    { name: "WISE 0350-5658", cl:"Y", p:{ra:ra( 3, 50,  0), dec: 0, distance: 11.208  } },
    { name: "EZ Aquarii",     cl:"M", p:{ra:ra(22, 38, 33), dec: 0, distance: 11.266  } },
  ],

  width: 800,
  height: 600,
  max_range: 15,
  radius_scale: 5
}

window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'),
      Game.width, Game.height);
    paper.rect(0, 0, Game.width, Game.height).attr({fill: "black"});

    Game.systems.forEach(function(system) {
      var px = pixelForCoordinate(system.p);
      var color = colorForSpectralClass(system.cl);
      var r = Game.radius_scale * radiusForSpectralClass(system.cl);
      paper.circle(px[0], px[1], r).attr({fill: color, stroke: "none"})
        .glow({color: color, width: 100});
    })
}
