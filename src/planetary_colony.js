module.exports = function(player) {
  this.player = player;
  this.capture_pernano = 1.411; // How much solar energy is recieved by the Earth's surface
}

module.exports.prototype.systemRadiatedEnergy_J_e41 = function(energy_J_e41) {
  this.player.harnessedEnergy_J_e41 += energy_J_e41 * (this.capture_pernano / 1000000000);
}