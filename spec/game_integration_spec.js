var Game = require('../src/game');
var Player = require('../src/player');
var systems = require('../src/systems')

describe('Game integration', function() {
  it('basic game', function() {
    var game = new Game(systems());
    game.p1 = new Player();

    game.start();

    expect(game.p1.harnessedEnergy_J_e41).toBe(0);
    game.step(0.01);

    expect(game.p1.harnessedEnergy_J_e41).toBeGreaterThan(0);
  });
});