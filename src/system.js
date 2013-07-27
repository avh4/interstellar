var MS_g_e33 = 1.989;
var LS_W_e26 = 3.846;

function color(cl) {
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

function radius(cl) {
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

function hmsToRadians(array) {
  return array[0] * Math.PI / 12;
}

module.exports = function(name, spectralClass, ra, dec, distance, omega, mass_MS, planets) {
  this._listeners = [];
  this.name = name;
  this.mass_g_e33 = mass_MS * MS_g_e33;
  this.radius = radius(spectralClass);
  this.color = color(spectralClass);
  this.planets = planets;
  this.ra_radians = hmsToRadians(ra);
  this.distance = distance;
}

module.exports.prototype.luminosity_W_e26 = function() {
  var M = this.mass_g_e33 / MS_g_e33;
  var L = Math.pow(M, 4);
  return LS_W_e26 * L;
}

module.exports.prototype.step = function(Δtime_years_e9) {
  var Δtime_seconds_e15 = Δtime_years_e9 * (3600 * 24 * 365 / 1000000);
  var luminosity_W_e26 = this.luminosity_W_e26();
  var radiated_J_e41 = luminosity_W_e26 * Δtime_seconds_e15;
  var radiated_g_e29 = radiated_J_e41 / 89.9;
  var th = this;
  this.mass_g_e33 -= radiated_g_e29 / 10000;
  this._listeners.forEach(function(l) {
    l.systemRadiatedEnergy(th.name, luminosity_W_e26, Δtime_seconds_e15);
  });
}

module.exports.prototype.addListener = function(l) {
  this._listeners.push(l);
}