define(["stellar_class"], function(StellarClass) {
  var M = 1.9891; // kg * 10^30
  var L = 3.846; // W * 10^26

  function System(name, classString, coordinate, ra_motion_mas_yr, mass, planets) {
    this.name = name;
    var cl = new StellarClass(classString);
    this.coordinate = coordinate;
    this.color = cl.color();
    this.radius = cl.radius();
    this.rad = ra_motion_mas_yr;
    this.energy = 0.1 * mass * M * 650; // TJoules * 10^30   (E = 65 TJ / kg)
  };

  System.prototype.rate = function() {
    var m = this.energy / 0.1 / 650 / M;
    var l;
    if (m < .43) {
      l = .23 * Math.pow(m, 2.3);
    } else if (m < 2) {
      l = Math.pow(m, 4);
    } else if (m < 20) {
      l = 1.5 * Math.pow(m, 3.5);
    } else {
      l = m;
    }

    return l * L * 3.15569 / 1000; // J * 10^26 * 10^7 * 10^6 / Myr = TJ *10^30 / Myr
  };

  return System;
})
