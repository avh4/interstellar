var uuid = require("node-uuid");

module.exports = function() {
  this.Myears = 0;
  this.uid = uuid.v1();
}

module.exports.prototype.step = function(dMyears) {
  this.Myears += dMyears;
}