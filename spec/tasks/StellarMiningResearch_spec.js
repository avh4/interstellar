var StellarMiningResearch = require('../../src/tasks/StellarMiningResearch');
var sinon = require('sinon');

describe('StellarMiningResearch', function() {
  var subject;

  beforeEach(function() {
    subject = new StellarMiningResearch();
  });

  it('should have a description', function() {
    expect(subject.toClient().description).toBeDefined();
  });

  it('should start with zero progress', function() {
    expect(subject.toClient().progress).toBe(0);
  });
});