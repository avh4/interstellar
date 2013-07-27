var Player = require('../src/player');

describe('Player', function() {
  var player = new Player();

  it('should have an id', function() {
    expect(player.uid).toBeDefined();
  });

  it('should start with zero energy', function() {
    expect(player.harnessedEnergy_J_e41).toBe(0);
  });
});