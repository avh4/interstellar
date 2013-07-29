var uuid = require("node-uuid");
var Colonizer = require('./tasks/Colonizer');

module.exports = function(systems) {
  this.uid = uuid.v1();
  this.systems = systems;
  this.colonizers = {};
}

module.exports.prototype.start = function(p1, p2, p3) {
  this.time_years_e9 = 0;
  var role = 'p1';
  this.initializePlayer(role, p1);
  p1.colonizeSystem(this.systems[0].name);
}

module.exports.prototype.initializePlayer = function(role, player) {
  this[role] = player;
  for (var i in this.systems) {
    var system = this.systems[i];
    var distributer = this.getDistributer(role, system.name);
    system.addListener(distributer);
  }
  var th = this;
  this.colonizers[role] = new Colonizer(player, this.systems,
    function() {return th.time_years_e9; });
}

module.exports.prototype.getDistributer = function(role, systemName) {
  var player = this[role];
  return player.getDistributer(systemName);
}

module.exports.prototype.step = function(Δtime_years_e9) {
  var th = this;
  var role = 'p1';
  th[role].currentCapture_W_e26 = 0;
  th.time_years_e9 += Δtime_years_e9;
  th.systems.forEach(function(s) {
    th[role][s.name] = {currentCapture_W_e26: 0};
    s.step(Δtime_years_e9);
  });
  this.colonizers[role].step();
}

module.exports.prototype.playerAction = function(role, action) {
  if (action.action == "changePercentages") {
    var systemName = action.system;
    var distributer = this.getDistributer(role, systemName);
    distributer.setPercentages(action.percentages);
  } else {
    console.log("Unknown player action for " + role);
    console.log(action);
  }
}

module.exports.prototype.toClient = function() {
  return {
    uid: this.uid,
    time_years_e9: this.time_years_e9,
    p1: this.p1.toClient(),
    systems: this.systems.map(function(s) { return s.toClient(); })
  };
}

module.exports.prototype.toString = function() {
  return '[Game]';
}