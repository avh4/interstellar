define([], function() {
  var ownershipBadges = {};

  function Player() {
    this.ownedSystems = [];
    this.consumed = 0;
  }

  Player.prototype.toggleOwnership = function(system) {
    if (_.contains(this.ownedSystems, system)) {
      this.ownedSystems = _.without(this.ownedSystems, system);
      ownershipBadges[system.name].destroy();
      ownershipBadges[system.name] = null;
    } else {
      this.ownedSystems.push(system);
      var badge = new Kinetic.Group({x: 10, y: 10});
      badge.add(new Kinetic.Circle({radius: 3, fill: "#0059ff"}));
      system.e.add(badge);
      ownershipBadges[system.name] = badge;
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