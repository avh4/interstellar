var Game = require('../src/game');

describe('game', function(){
  var game = new Game();

  describe('a new game', function() {
    it('should have time = 0', function() {
      expect(game.Myears).toEqual(0);
    });

    it('should have a uid', function() {
      expect(game.uid).toBeDefined();
    });

    it('should have no players', function() {
      expect(game.p1).not.toBeDefined();
      expect(game.p2).not.toBeDefined();
      expect(game.p3).not.toBeDefined();
    })
  });

  describe('stepping a game', function() {
    beforeEach(function() {
      game.step(0.1);
    });

    it('advances time', function() {
      expect(game.Myears).toEqual(0.1);
    });
  });
});
