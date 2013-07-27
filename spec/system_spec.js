var System = require('../src/system');
var sinon = require('sinon');

describe('System', function() {
  var solarSystem = new System(1);
  var listener = {};

  beforeEach(function() {
    listener.systemRadiatedEnergy_J_e41 = sinon.spy();
    solarSystem.addListener(listener);
  });

  it('should have mass', function() {
    expect(solarSystem.mass_g_e33).toBeCloseTo(1.989, 3);
  });

  it('should have luminosity', function() {
    expect(solarSystem.luminosity_W_e26()).toBeCloseTo(3.846, 3);
  });

  describe('step()', function() {
    var Δtime_years_e9 = 1;
    var Δtime_seconds_e15 = Δtime_years_e9 * (3600 * 24 * 365 / 1000000);
    var radiated_J_e41;

    beforeEach(function() {
      radiated_J_e41 = solarSystem.luminosity_W_e26() * Δtime_seconds_e15;
      expect(radiated_J_e41).toBeCloseTo(121.2874, 1);
    });

    it('should lose mass as radiated energy', function() {
      var radiated_g_e29 = radiated_J_e41 / 89.9;
      expect(radiated_g_e29).toBeCloseTo(1.3, 1);
      var original_mass_g_e33 = solarSystem.mass_g_e33;

      solarSystem.step(Δtime_years_e9);

      expect(solarSystem.mass_g_e33)
        .toBe(original_mass_g_e33 - (radiated_g_e29 / 10000));
    });

    it('should emit radiation to listeners', function() {
      solarSystem.step(Δtime_years_e9);
      expect(listener.systemRadiatedEnergy_J_e41).toHaveBeenCalledWith(radiated_J_e41);
    });
  });
});