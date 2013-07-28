var EnergyDistributer = require('../src/energy_distributer');
var sinon = require('sinon');
require('jasmine-sinon');

describe('EnergyDistributer', function() {
  var subject;
  var player;
  var task;
  var systemName = "Solar System";
  var luminosity_W_e26 = 700;
  var Δtime_seconds_e15 = 100;

  beforeEach(function() {
    player = { harnessedEnergy_J_e41: 0, currentCapture_W_e26: 0,
      "Solar System": { currentCapture_W_e26: 0} };
    task = {};
    task.receiveEnergy = sinon.spy();
    player.taskFor = sinon.stub().withArgs('Solar System').returns(task);
    subject = new EnergyDistributer(player);
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
        expect(task.receiveEnergy).toHaveBeenCalledWith(350);
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
        subject.addComponent(c1);
        subject.addComponent(c2);
      });

      it('should capture and distribute energy', function() {
        subject.systemRadiatedEnergy(systemName, luminosity_W_e26, Δtime_seconds_e15);
        expect(task.receiveEnergy).toHaveBeenCalledWith(550);
      });
    });
  });
});