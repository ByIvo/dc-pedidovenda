"use strict";
var runner = require('./../src/runner.js');
var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;

var expect = chai.expect;

var newman = require('newman');

describe("Runner", function(){

  it("Should run newman", function(){
    var envPath = "/tmp/env.json";
    var globalsPath = "/tmp/globals.json";
    var collectionPath = "/tmp/collection.json";

    var spy = sinon.spy(newman, 'run');

    runner.run(envPath, collectionPath, globalsPath);

    assert(spy.calledOnce, "Don\'t called newman\'s run method");
    spy.restore();
  });
});
