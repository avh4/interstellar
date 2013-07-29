var stages = [
  { description: "Developing Terrestrial Mining",
    energy_J_e41: 0,
    abilities: { } },
  { description: "Developing Asteroid Mining",
    energy_J_e41: 0.00000001,
    abilities: { } },
  { description: "Developing Comet Mining",
    energy_J_e41: 0.0000001,
    abilities: { } },
  { description: "Developing Gas Giant Mining",
    energy_J_e41: 0.000001,
    abilities: { } },
  { description: "Developing Dwarf Star Mining",
    energy_J_e41: 0.00001,
    abilities: { } },
  { description: "Developing Star Lifting",
    energy_J_e41: 0.0001,
    abilities: { } },
  { description: "Perfecting Planetary Mining" }
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
  return '[PlanetaryMiningResearch]';
}

module.exports.prototype.toClient = function() {
  var lastThreshold = this.stage == 0 ? 0 : stages[this.stage - 1].energy_J_e41;
  return {
    description: stages[this.stage].description,
    progress: (this.energy_J_e41 - lastThreshold) / (stages[this.stage].energy_J_e41 - lastThreshold)
  }
}
