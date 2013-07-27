var Game = require('../src/game');
var sinon = require('sinon'); require('jasmine-sinon');

describe('Game', function(){
  var s1;
  var systems;
  var game;

  beforeEach(function() {
    s1 = {};
    systems = [s1];
    s1.addListener = sinon.spy();
    game = new Game(systems);
  });

  describe('a new game', function() {
    it('should have a uid', function() {
      expect(game.uid).toBeDefined();
    });

    it('should have no players', function() {
      expect(game.p1).not.toBeDefined();
      expect(game.p2).not.toBeDefined();
      expect(game.p3).not.toBeDefined();
    });
  });

  describe('starting a game', function() {
    beforeEach(function() {
      game.start();
    });

    it('should have time = 0', function() {
      expect(game.time_years_e9).toEqual(0);
    });
  });

  describe('stepping a game', function() {
    var p1;

    beforeEach(function() {
      p1 = {};
      s1.step = sinon.stub();
      game.p1 = p1;
      game.start();
      game.step(0.1);
    });

    it('advances time', function() {
      expect(game.time_years_e9).toEqual(0.1);
    });

    it('steps systems', function() {
      expect(s1.step).toHaveBeenCalledWith(0.1);
    });
  });
});
