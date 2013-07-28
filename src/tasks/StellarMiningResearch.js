var stages = [
  { description: "Developing Planet-scale Solar Technology",
    energy_J_e41: 0,
    abilities: { capture_pernano:       1.411 } },
  { description: "Developing Orbital Solar Collectors",
    energy_J_e41: 0.00000001 },
  { description: "Building Orbital Solar Collectors",
    energy_J_e41: 0.000000011,
    abilities: { capture_pernano:       6 } },
  { description: "Developing Dyson Rings",
    energy_J_e41: 0.00000005 },
  { description: "Building Dyson Ring",
    energy_J_e41: 0.000000055,
    abilities: { capture_pernano:     720 } },
  { description: "Developing Dyson Bubble",
    energy_J_e41: 0.00000080 },
  { description: "Building Dyson Bubble",
    energy_J_e41: 0.00000100,
    abilities: { capture_pernano:    23000 } },
  { description: "Developing Dyson Sphere",
    energy_J_e41: 0.00005000 },
  { description: "Building Dyson Sphere",
    energy_J_e41: 0.00010000,
    abilities: { capture_pernano: 900000000 } },
  { description: "Perfecting Stellar Mining" }
];

module.exports = function(abilities) {
  this.abilities = abilities;
  this.progress = 0;
  this.energy_J_e41 = 0;
  this.stage = 0;
}

module.exports.prototype.updateStage = function() {
  for (var i = 0; i < stages.length; i++) {
    var threshold = stages[i].energy_J_e41;
    if (typeof threshold === 'undefined' || threshold > this.energy_J_e41) {
      this.stage = i;
      return;
    }
    if (!!stages[i].abilities) {
      for (var a in stages[i].abilities) {
        this.abilities[a] = stages[i].abilities[a];
      }
    }
  }
}

module.exports.prototype.receiveEnergy_J_e41 = function(energy_J_e41) {
  this.energy_J_e41 += energy_J_e41;
  this.updateStage();
}

module.exports.prototype.toString = function() {
  return '[StellarMiningResearch]';
}

module.exports.prototype.toClient = function() {
  var lastThreshold = this.stage == 0 ? 0 : stages[this.stage - 1].energy_J_e41;
  return {
    description: stages[this.stage].description,
    progress: (this.energy_J_e41 - lastThreshold) / (stages[this.stage].energy_J_e41 - lastThreshold)
  }
}
