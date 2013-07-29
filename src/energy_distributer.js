var StellarMiningResearch = require('../src/tasks/StellarMiningResearch');
var InterstellarTravelResearch = require('../src/tasks/InterstellarTravelResearch');
var PlanetaryMiningResearch = require('../src/tasks/PlanetaryMiningResearch');

var taskNames = { stellarMining: 1, travel: 1, planetaryMining: 1 };

module.exports = function(logHarnessedEnergy_J_e41, logCurrentCapture_W_e26, abilities) {
  this.logHarnessedEnergy_J_e41 = logHarnessedEnergy_J_e41;
  this.logCurrentCapture_W_e26 = logCurrentCapture_W_e26;
  this.abilities = abilities;
  this.percentages = {};
  this.tasks = {};
  
  this.tasks.stellarMining = new StellarMiningResearch(abilities);
  this.tasks.travel = new InterstellarTravelResearch(abilities);
  this.tasks.planetaryMining = new PlanetaryMiningResearch(abilities);
  this.percentages.stellarMining = 0;
  this.percentages.travel = 0;
  this.percentages.planetaryMining = 0;
}

module.exports.prototype.systemRadiatedEnergy =
function(systemName, luminosity_W_e26, Δtime_seconds_e15) {
  var abilities = this.abilities;
  var energy_W_e26 = luminosity_W_e26 * abilities.capture_pernano / 1000000000;
  var energy_J_e41 = energy_W_e26 * Δtime_seconds_e15;
  this.logHarnessedEnergy_J_e41(systemName, energy_J_e41);
  this.logCurrentCapture_W_e26(systemName, energy_W_e26);

  for (var taskName in taskNames) {
    var percentage = this.percentages[taskName];
    var task = this.tasks[taskName];
    task.receiveEnergy_J_e41(percentage * energy_J_e41);
  }
}

module.exports.prototype.setPercentages = function(percentages) {
  for(var task in this.tasks) {
    this.percentages[task] = percentages[task];
  }
}

module.exports.prototype.toString = function() {
  return '[EnergyDistributer]';
}

module.exports.prototype.toClient = function() {
  var tasks = {};
  for (var taskName in taskNames) {
    tasks[taskName] = this.tasks[taskName].toClient();
  }
  return tasks;
}