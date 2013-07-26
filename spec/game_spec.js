var Game = require('../src/game');

describe('game', function(){
  describe('a new game', function() {
    var game = new Game();
    it('should have time = 0', function() {
      expect(game.years).toEqual(0);
    })
  });
});
