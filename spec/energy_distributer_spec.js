var EnergyDistributer = require('../src/energy_distributer');
var sinon = require('sinon');
require('jasmine-sinon');

describe('EnergyDistributer', function() {
  var subject;
  var player;
  var systemName = "Solar System";
  var luminosity_W_e26 = 700;
  var Δtime_seconds_e15 = 100;

  beforeEach(function() {
    player = { harnessedEnergy_J_e41: 0, currentCapture_W_e26: 0,
      "Solar System": { currentCapture_W_e26: 0} };
    subject = new EnergyDistributer(player);
  });

  describe('when it recieves stellar radiation', function() {
    describe('with one component', function() {
      var c1;

      beforeEach(function() {
        c1 = {};
        c1.captureEnergy_W_e26 = sinon.stub().withArgs(luminosity_W_e26).returns(350);
        c1.receiveEnergy = sinon.spy();
        subject.addComponent(c1);
        subject.systemRadiatedEnergy(systemName, luminosity_W_e26, Δtime_seconds_e15);
      });

      it('should capture and distribute energy', function() {
        expect(c1.receiveEnergy).toHaveBeenCalledWith(350);
      });

      it('should increase the player\'s harnessed energy total', function() {
        expect(player.harnessedEnergy_J_e41).toBe(350 * Δtime_seconds_e15);
      });

      it('should increase the player\'s capture', function() {
        expect(player.currentCapture_W_e26).toBe(350);
        expect(player[systemName].currentCapture_W_e26).toBe(350);
      });
    });

    describe('with two components', function() {
      var c1, c2;

      beforeEach(function() {
        c1 = {};
        c2 = {};
        c1.captureEnergy_W_e26 = sinon.stub().withArgs(700).returns(350);
        c2.captureEnergy_W_e26 = sinon.stub().withArgs(700).returns(200);
        c1.receiveEnergy = sinon.stub().withArgs(550).returns(400);
        c2.receiveEnergy = sinon.spy();
        subject.addComponent(c1);
        subject.addComponent(c2);
      });

      it('should capture and distribute energy', function() {
        subject.systemRadiatedEnergy(systemName, luminosity_W_e26, Δtime_seconds_e15);
        expect(c1.receiveEnergy).toHaveBeenCalledWith(550);
        expect(c2.receiveEnergy).toHaveBeenCalledWith(150);
      });
    });
  });
});