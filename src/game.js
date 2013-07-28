var uuid = require("node-uuid");

module.exports = function(systems) {
  this.uid = uuid.v1();
  this.systems = systems;
}

module.exports.prototype.start = function(p1, p2, p3) {
  this.time_years_e9 = 0;
  this.initializePlayer('p1', p1);
}

module.exports.prototype.initializePlayer = function(role, player) {
  this[role] = player;
  for (var i in this.systems) {
    var system = this.systems[i];
    var distributer = this.getDistributer(role, system.name);
    system.addListener(distributer);
  }
}

module.exports.prototype.getDistributer = function(role, systemName) {
  var player = this[role];
  return player.getDistributer(systemName);
}

module.exports.prototype.step = function(Δtime_years_e9) {
  var th = this;
  th.p1.currentCapture_W_e26 = 0;
  th.time_years_e9 += Δtime_years_e9;
  th.systems.forEach(function(s) {
    th.p1[s.name] = {currentCapture_W_e26: 0};
    s.step(Δtime_years_e9);
  });
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