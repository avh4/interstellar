var stages = [
  { description: "Developing Orbital Solar Collectors",
    energy_J_e41: 0.00000001 },
  { description: "Building Orbital Solar Collectors",
    energy_J_e41: 0.000000011 },
  { description: "Developing Dyson Rings",
    energy_J_e41: 0.00000005 },
  { description: "Building Dyson Ring",
    energy_J_e41: 0.000000055 },
  { description: "Developing Dyson Bubble",
    energy_J_e41: 0.00000008 },
  { description: "Building Dyson Bubble",
    energy_J_e41: 0.00000010 },
  { description: "Developing Dyson Sphere",
    energy_J_e41: 0.00000050 },
  { description: "Building Dyson Sphere",
    energy_J_e41: 0.00000100 },
  { description: "Researching Stellar Mining" }
];

module.exports = function() {
  this.progress = 0;
  this.energy_J_e41 = 0;
  this.stage = 0;
}

module.exports.prototype.updateStage = function() {
  for (var i = 0; i < stages.length; i++) {
    var threshold = stages[i].energy_J_e41;
    if (!threshold || threshold > this.energy_J_e41) {
      this.stage = i;
      return;
    }
  }
}

module.exports.prototype.receiveEnergy = function(energy_J_e41) {
  this.energy_J_e41 += energy_J_e41;
  this.updateStage();
}

module.exports.prototype.toString = function() {
  return '[ResearchOrbitalSolarCollectors]';
}

module.exports.prototype.toClient = function() {
  var lastThreshold = this.stage == 0 ? 0 : stages[this.stage - 1].energy_J_e41;
  return {
    description: stages[this.stage].description,
    progress: (this.energy_J_e41 - lastThreshold) / (stages[this.stage].energy_J_e41 - lastThreshold)
  }
}
