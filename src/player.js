var uuid = require("node-uuid");
var WasteEnergyTask = require('./tasks/WasteEnergyTask');

module.exports = function() {
  this.uid = uuid.v1();
  this.harnessedEnergy_J_e41 = 0;
  this.currentCapture_W_e26 = 0;
  this.tasks = {};
}

module.exports.prototype.toClient = function() {
  var tasks = {};
  for (var s in this.tasks) {
    tasks[s] = this.tasks[s].toClient();
  }
  return {
    uid: this.uid,
    harnessedEnergy_J_e41: this.harnessedEnergy_J_e41,
    currentCapture_W_e26: this.currentCapture_W_e26,
    tasks: tasks
  };
}

module.exports.prototype.setTask = function(systemName, task) {
  this.tasks[systemName] = task;
}

module.exports.prototype.taskFor = function(systemName) {
  if (!this.tasks[systemName]) {
    this.setTask(systemName, new WasteEnergyTask());
  }
  return this.tasks[systemName];
}

module.exports.prototype.abilitiesFor = function(systemName) {
  return { capture_pernano: 1.411 };
}

module.exports.prototype.toString = function() {
  return '[Player]';
}