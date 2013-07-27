module.exports = function(player) {
  this.player = player;
  this.capture_pernano = 1.411; // How much solar energy is recieved by the Earth's surface
}

module.exports.prototype.systemRadiatedEnergy = function(systemName, luminosity_W_e26, Δtime_seconds_e15) {
  var capture_W_e26 = luminosity_W_e26 * (this.capture_pernano / 1000000000);
  var energy_J_e41 = capture_W_e26 * Δtime_seconds_e15;
  this.player.harnessedEnergy_J_e41 += energy_J_e41;
  this.player.currentCapture_W_e26 += luminosity_W_e26;
  this.player[systemName].currentCapture_W_e26 += luminosity_W_e26;
}