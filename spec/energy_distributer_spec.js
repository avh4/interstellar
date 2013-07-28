var EnergyDistributer = require('../src/energy_distributer');
var sinon = require('sinon');
require('jasmine-sinon');

describe('EnergyDistributer', function() {
  var subject;
  var logHarnessedEnergy_J_e41, logCurrentCapture_W_e26;
  var receiveEnergy_J_e41;
  var systemName = "Solar System";
  var luminosity_W_e26 = 700;
  var Δtime_seconds_e15 = 100;

  beforeEach(function() {
    logHarnessedEnergy_J_e41 = sinon.spy();
    logCurrentCapture_W_e26 = sinon.spy();
    receiveEnergy_J_e41 = sinon.spy();
    subject = new EnergyDistributer(logHarnessedEnergy_J_e41, logCurrentCapture_W_e26, receiveEnergy_J_e41);
  });

  describe('when it recieves stellar radiation', function() {
    describe('with one component', function() {
      var c1;

      beforeEach(function() {
        c1 = {};
        c1.captureEnergy_W_e26 = sinon.stub().withArgs(luminosity_W_e26).returns(350);
        subject.addComponent(c1);
        subject.systemRadiatedEnergy(systemName, luminosity_W_e26, Δtime_seconds_e15);
      });

      it('should capture and distribute energy', function() {
        expect(receiveEnergy_J_e41).toHaveBeenCalledWith('Solar System', 350 * Δtime_seconds_e15);
      });

      it('should increase the player\'s harnessed energy total', function() {
        expect(logHarnessedEnergy_J_e41).toHaveBeenCalledWith('Solar System', 350 * Δtime_seconds_e15);
      });

      it('should increase the player\'s capture', function() {
        expect(logCurrentCapture_W_e26).toHaveBeenCalledWith('Solar System', 350);
      });
    });

    describe('with two components', function() {
      var c1, c2;

      beforeEach(function() {
        c1 = {};
        c2 = {};
        c1.captureEnergy_W_e26 = sinon.stub().withArgs(700).returns(350);
        c2.captureEnergy_W_e26 = sinon.stub().withArgs(700).returns(200);
        subject.addComponent(c1);
        subject.addComponent(c2);
      });

      it('should capture and distribute energy', function() {
        subject.systemRadiatedEnergy(systemName, luminosity_W_e26, Δtime_seconds_e15);
        expect(receiveEnergy_J_e41).toHaveBeenCalledWith('Solar System', 550 * Δtime_seconds_e15);
      });
    });
  });
});