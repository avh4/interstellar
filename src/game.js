var uuid = require("node-uuid");
var PlanetaryColony = require('../src/planetary_colony');

module.exports = function(systems) {
  this.uid = uuid.v1();
  this.systems = systems;
}

module.exports.prototype.start = function() {
  this.time_years_e9 = 0;
  this.systems[0].addListener(new PlanetaryColony(this.p1));
}

module.exports.prototype.step = function(Δtime_years_e9) {
  this.time_years_e9 += Δtime_years_e9;
  this.systems.forEach(function(s) {
    s.step(Δtime_years_e9);
  });
}