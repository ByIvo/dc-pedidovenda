var chai = require('chai');
var expect = chai.expect;

var templateSolver = require('./../src/template-solver.js');

describe("TemplateSolver", function() {
  it("Should find a template-test file", function() {
    var template = templateSolver.readTemplate('template-test.json', __dirname);

    expect(template).to.be.deep.equal({
      "id": "1",
      "values": [
        {
          "type": "any",
          "value": ["Finalizar Solicitação"],
          "key": "ordem_solicitacao"
        }
      ],
      "_postman_variable_scope": "globals"
    });
  });
});
