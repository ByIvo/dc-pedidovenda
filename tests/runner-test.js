var runner = require('./../src/runner.js');
var sinon = require('sinon');
var chai = require('chai');

var newman = require('newman');

var expect = chai.expect;

describe("Runner", function(){

  it("Should run newman", function(){
    // var globals = __dirname + '/resources/template-test.json';
    var envPath = "/tmp/env.json";
    var globalsPath = "/tmp/globals.json";
    var collectionPath = "/tmp/collection.json";

    var spy = sinon.spy(newman, 'run');

    runner.asd(envPath, collectionPath, globalsPath);

    expect(spy).to.have.been.calledWith({
      collection: collectionPath,
      environment: envPath,
      globals: globalsPath
    });
    spy.restore();
  });
});
