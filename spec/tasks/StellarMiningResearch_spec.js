var StellarMiningResearch = require('../../src/tasks/StellarMiningResearch');
var sinon = require('sinon');

describe('StellarMiningResearch', function() {
  var subject;
  var abilities;

  beforeEach(function() {
    abilities = {};
    subject = new StellarMiningResearch(abilities);
  });

  it('should have a description', function() {
    expect(subject.toClient().description).toBeDefined();
  });
});