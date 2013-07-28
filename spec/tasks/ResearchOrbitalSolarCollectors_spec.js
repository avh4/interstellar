var ResearchOrbitalSolarCollectors = require('../../src/tasks/ResearchOrbitalSolarCollectors');
var sinon = require('sinon');

describe('ResearchOrbitalSolarCollectors', function() {
  var subject;

  beforeEach(function() {
    subject = new ResearchOrbitalSolarCollectors();
  });

  it('should have a description', function() {
    expect(subject.toClient().description).toBeDefined();
  });

  it('should start with zero progress', function() {
    expect(subject.toClient().progress).toBe(0);
  });
});