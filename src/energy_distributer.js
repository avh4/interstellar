module.exports = function(stats, output) {
  this.stats = stats;
  this.output = output;
  this._components = [];
}

module.exports.prototype.addComponent = function(component) {
  this._components.push(component);
}

module.exports.prototype.systemRadiatedEnergy =
function(systemName, luminosity_W_e26, Δtime_seconds_e15) {
  var energy_W_e26 = 0;
  var th = this;
  this._components.forEach(function(c) {
    energy_W_e26 += c.captureEnergy_W_e26(luminosity_W_e26, Δtime_seconds_e15);
  });
  var energy_J_e41 = energy_W_e26 * Δtime_seconds_e15;
  this.stats.logHarnessedEnergy_J_e41(systemName, energy_J_e41);
  this.stats.logCurrentCapture_W_e26(systemName, energy_W_e26);

  this.output.receiveEnergy_J_e41(systemName, energy_J_e41);
}