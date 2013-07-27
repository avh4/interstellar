var PlanetaryColony = require('../src/planetary_colony');
var sinon = require('sinon');

describe('Planetary Colony', function() {
  var subject;
  var player;
  var systemName = "Galaxia";

  beforeEach(function() {
    player = {
      harnessedEnergy_J_e41: 0,
      currentCapture_W_e26: 0,
      "Galaxia": { currentCapture_W_e26: 0}
    };
    subject = new PlanetaryColony(player);
  });

  describe('recieving energy', function() {
    var luminosity_W_e26 = 2;
    var Δtime_seconds_e15 = 100;
    var capture_pernano = 1.411;

    beforeEach(function() {
      subject.systemRadiatedEnergy(systemName, luminosity_W_e26, Δtime_seconds_e15);
    });

    it('should increase the player\'s harnessed energy total', function() {
      var energy_J_e41 = luminosity_W_e26 * Δtime_seconds_e15;
      expect(player.harnessedEnergy_J_e41).toBe(energy_J_e41 * capture_pernano / 1000000000);
    });

    it('should increase the player\'s capture', function() {
      expect(player.currentCapture_W_e26).toBe(luminosity_W_e26 * capture_pernano / 1000000000);
      expect(player[systemName].currentCapture_W_e26).toBe(luminosity_W_e26 * capture_pernano / 1000000000);
    });
  });
});
