var MS_g_e33 = 1.989;
var LS_W_e26 = 3.846;

module.exports = function(mass_MS) {
  this._listeners = [];
  this.mass_g_e33 = mass_MS * MS_g_e33;
}

module.exports.prototype.luminosity_W_e26 = function() {
  var M = this.mass_g_e33 / MS_g_e33;
  var L = Math.pow(M, 4);
  return LS_W_e26 * L;
}

module.exports.prototype.step = function(Δtime_years_e9) {
  var Δtime_seconds_e15 = Δtime_years_e9 * (3600 * 24 * 365 / 1000000);
  var radiated_J_e41 = this.luminosity_W_e26() * Δtime_seconds_e15;
  var radiated_g_e29 = radiated_J_e41 / 89.9;
  this.mass_g_e33 -= radiated_g_e29 / 10000;
  this._listeners[0].systemRadiatedEnergy_J_e41(radiated_J_e41);
}

module.exports.prototype.addListener = function(l) {
  this._listeners.push(l);
}