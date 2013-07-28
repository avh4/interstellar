module.exports = function(player) {
  this.player = player;
  this.capture_pernano = 1.411; // How much solar energy is recieved by the Earth's surface
}

module.exports.prototype.captureEnergy_W_e26 = function(luminosity_W_e26, Δtime_seconds_e15) {
  var capture_W_e26 = luminosity_W_e26 * (this.capture_pernano / 1000000000);
  return capture_W_e26;
}

module.exports.prototype.receiveEnergy = function(energy_W_e26, Δtime_seconds_e15) {
  return energy_W_e26;
}