module.exports = function(player, systems, currentTime) {
  this.player = player;
  this.currentTime = currentTime;
  this.targets = systems;
  this.currentTarget = undefined;
}

module.exports.prototype.step = function() {
  if (!this.currentTarget) {
    for (var i = 0; i < this.targets.length; i++) {
      if (!this.player.hasColonized(this.targets[i].name)) {
        this.currentTarget = this.targets[i];
        this.remaining = this.currentTarget.distance;
        break;
      }
    }
  }
  if (!this.currentTarget) {
    return;
  }
  
  this.remaining -= (this.player.abilities["Solar System"].travel_speed_c || 0);
  if (this.remaining <= 0) {
    this.player.colonizeSystem(this.currentTarget.name);
    this.currentTarget = undefined;
  }
};

module.exports.prototype.toString = function() {
  return '[Colonizer]';
}