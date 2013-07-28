module.exports = function() {
  this.progress = 0;
}

module.exports.prototype.receiveEnergy = function(energy_W_e26) {
}

module.exports.prototype.toString = function() {
  return '[ResearchOrbitalSolarCollectors]';
}

module.exports.prototype.toClient = function() {
  return {
    description: "Researching Orbital Solar Collectors",
    progress: this.progress
  }
}
