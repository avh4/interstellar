define([], function() {
  function Player() {
    this.ownedSystems = [];
    this.consumed = 0;
  }
  
  Player.prototype.toggleOwnership = function(system) {
    if (_.contains(this.ownedSystems, system)) {
      this.ownedSystems = _.without(this.ownedSystems, system);
    } else {
      this.ownedSystems.push(system);
    }
  }
  
  Player.prototype.update = function(system) {
    var p = this;
    _.each(this.ownedSystems, function(s) {
      var rate = s.rate();
      s.energy -= rate;
      p.consumed += rate;
    });
  }
  
  return Player;
});