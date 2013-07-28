var uuid = require("node-uuid");
var PlanetaryColony = require('../src/planetary_colony');
var EnergyDistributer = require('../src/energy_distributer');
var ResearchOrbitalSolarCollectors = require('../src/tasks/ResearchOrbitalSolarCollectors');

module.exports = function(systems) {
  this.uid = uuid.v1();
  this.systems = systems;
  this.distributers = { p1: {}};
}

module.exports.prototype.start = function() {
  this.time_years_e9 = 0;
  var role = 'p1';
  var player = this[role];
  var system = this.systems[0];
  var distributer = this.distributers[role][system.name];
  if (!distributer) {
    distributer = this.distributers[role][system.name] = new EnergyDistributer(player);
    system.addListener(distributer);
  }
  distributer.addComponent(new PlanetaryColony(player));
}

module.exports.prototype.step = function(Δtime_years_e9) {
  var th = this;
  th.p1.currentCapture_W_e26 = 0;
  th.time_years_e9 += Δtime_years_e9;
  th.systems.forEach(function(s) {
    th.p1[s.name] = {currentCapture_W_e26: 0};
    s.step(Δtime_years_e9);
  });
}

module.exports.prototype.playerAction = function(role, action) {
  this.p1.setTask(action.system, new ResearchOrbitalSolarCollectors());
}

module.exports.prototype.toClient = function() {
  return {
    uid: this.uid,
    time_years_e9: this.time_years_e9,
    p1: this.p1.toClient(),
    systems: this.systems.map(function(s) { return s.toClient(); })
  };
}