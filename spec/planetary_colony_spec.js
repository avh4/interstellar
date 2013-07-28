var PlanetaryColony = require('../src/planetary_colony');
var sinon = require('sinon');

describe('Planetary Colony', function() {
  var subject;
  var player;
  var systemName = "Galaxia";
  var capture_pernano = 1.411;
  var luminosity_W_e26 = 2;
  var Δtime_seconds_e15 = 100;

  beforeEach(function() {
    player = {
      harnessedEnergy_J_e41: 0,
      currentCapture_W_e26: 0,
      "Galaxia": { currentCapture_W_e26: 0}
    };
    subject = new PlanetaryColony(player);
  });

  describe('capturing energy', function() {
    var result;

    beforeEach( function() {
      result = subject.captureEnergy_W_e26(luminosity_W_e26, Δtime_seconds_e15);
    });

    it('should capture a portion of the luminosity', function() {
      expect(result).toBe(luminosity_W_e26 * capture_pernano / 1000000000);
    });
  });
});
