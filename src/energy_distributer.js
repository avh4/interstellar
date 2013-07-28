var StellarMiningResearch = require('../src/tasks/StellarMiningResearch');

module.exports = function(logHarnessedEnergy_J_e41, logCurrentCapture_W_e26, abilities) {
  this.logHarnessedEnergy_J_e41 = logHarnessedEnergy_J_e41;
  this.logCurrentCapture_W_e26 = logCurrentCapture_W_e26;
  this.abilities = abilities;
  this.percentages = {};
  this.tasks = {};
  
  this.tasks.stellarMining = new StellarMiningResearch(abilities);
  this.percentages.stellarMining = 0;
}

module.exports.prototype.systemRadiatedEnergy =
function(systemName, luminosity_W_e26, Δtime_seconds_e15) {
  var abilities = this.abilities;
  var energy_W_e26 = luminosity_W_e26 * abilities.capture_pernano / 1000000000;
  var energy_J_e41 = energy_W_e26 * Δtime_seconds_e15;
  this.logHarnessedEnergy_J_e41(systemName, energy_J_e41);
  this.logCurrentCapture_W_e26(systemName, energy_W_e26);

  var taskName = 'stellarMining';
  var percentage = this.percentages[taskName];
  var task = this.tasks[taskName];
  task.receiveEnergy_J_e41(percentage * energy_J_e41);
}

module.exports.prototype.setPercentages = function(percentages) {
  this.percentages.stellarMining = percentages.stellarMining;
}

module.exports.prototype.toString = function() {
  return '[EnergyDistributer]';
}