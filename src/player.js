var uuid = require("node-uuid");
var WasteEnergyTask = require('./tasks/WasteEnergyTask');
var EnergyDistributer = require('../src/energy_distributer');

module.exports = function() {
  this.uid = uuid.v1();
  this.harnessedEnergy_J_e41 = 0;
  this.currentCapture_W_e26 = 0;
  this.abilities = {};
  this.distributers = {};
  this.colonizedSystems = {};
}

module.exports.prototype.colonizeSystem = function(systemName) {
  this.colonizedSystems[systemName] = 1;
}

module.exports.prototype.hasColonized = function(systemName) {
  return !!this.colonizedSystems[systemName];
}

module.exports.prototype.toClient = function() {
  var tasks = {};
  for (var s in this.colonizedSystems) {
    tasks[s] = this.getDistributer(s).toClient();
  }
  return {
    uid: this.uid,
    harnessedEnergy_J_e41: this.harnessedEnergy_J_e41,
    currentCapture_W_e26: this.currentCapture_W_e26,
    colonizations: this.colonizer.toClient(),
    tasks: tasks
  };
}

module.exports.prototype.abilitiesFor = function(systemName) {
  if (!this.abilities[systemName]) {
    this.abilities[systemName] = { capture_pernano: 0 };
  }
  return this.abilities[systemName];
}

module.exports.prototype.getDistributer = function(systemName) {
  var player = this;
  if (!this.distributers[systemName]) {
    this.distributers[systemName] = new EnergyDistributer(
      function(s, v) { player.harnessedEnergy_J_e41 += v },
      function(s, v) {
        player.currentCapture_W_e26 += v;
        player[s].currentCapture_W_e26 += v;
      },
      player.abilitiesFor(systemName)
      );
  }
  return this.distributers[systemName];
}

module.exports.prototype.toString = function() {
  return '[Player]';
}