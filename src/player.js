var uuid = require("node-uuid");

module.exports = function() {
  this.uid = uuid.v1();
  this.harnessedEnergy_J_e41 = 0;
  this.currentCapture_W_e26 = 0;
}
