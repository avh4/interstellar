module.exports = function(logHarnessedEnergy_J_e41, logCurrentCapture_W_e26,
    receiveEnergy_J_e41, getAbilities) {
  this.logHarnessedEnergy_J_e41 = logHarnessedEnergy_J_e41;
  this.logCurrentCapture_W_e26 = logCurrentCapture_W_e26;
  this.receiveEnergy_J_e41 = receiveEnergy_J_e41;
  this.getAbilities = getAbilities;
}

module.exports.prototype.systemRadiatedEnergy =
function(systemName, luminosity_W_e26, Δtime_seconds_e15) {
  var abilities = this.getAbilities(systemName);
  var energy_W_e26 = luminosity_W_e26 * abilities.capture_pernano / 1000000000;
  var energy_J_e41 = energy_W_e26 * Δtime_seconds_e15;
  this.logHarnessedEnergy_J_e41(systemName, energy_J_e41);
  this.logCurrentCapture_W_e26(systemName, energy_W_e26);

  this.receiveEnergy_J_e41(systemName, energy_J_e41);
}