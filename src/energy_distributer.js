module.exports = function(player) {
  this.player = player;
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
  th.player.harnessedEnergy_J_e41 += energy_W_e26 * Δtime_seconds_e15;
  th.player.currentCapture_W_e26 += energy_W_e26;
  th.player[systemName].currentCapture_W_e26 += energy_W_e26;
  var task = this.player.taskFor(systemName);
  task.receiveEnergy(energy_W_e26);
}