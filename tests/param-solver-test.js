var chai = require('chai');
var expect = chai.expect;

var ParamSolver = require('./../src/param-solver.js');

describe('ParamSolver', function() {
  it('Should return an empty array when has no input', function() {
    var paramSolver = new ParamSolver();

    var params = paramSolver.resolve([]);
    expect(params).to.be.empty;
  });

  it('Should return only those parameters that is "=" separetad', function() {
    var paramSolver = new ParamSolver();

    var params = paramSolver.resolve([
      "shouldIgnore",
      "key=value",
      "anotherKey=value",
      "shoudlIgnore",
      "emptyValue="
    ]);

    expect(params).to.be.deep.equal({
      key: "value",
      anotherKey: "value",
      emptyValue: ""
    });
  });

  it('Should ignore others "=" in param', function() {
    var paramSolver = new ParamSolver();

    var params = paramSolver.resolve([
      "key=value=more",
      "scapedThis=key=has=many=splitters"
    ]);

    expect(params).to.be.deep.equal({
      key: "value",
      scapedThis: "key"
    });
  });
});
