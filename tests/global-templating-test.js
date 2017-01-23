var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');

var ParamSolver = require('./../src/param-solver.js');
var GlobalTemplating = require('./../src/global-templating.js');
var TemplateSolver = require('./../src/template-solver.js');

describe('GlobalTemplating', function() {

  beforeEach(function() {
    sinon.stub(TemplateSolver.prototype, 'readTemplate', function(templateName, path) {
      return {
        "id": "1",
        "values": [
          {
            "type": "any",
            "value": ["Finalizar Solicitação"],
            "key": "ordem_solicitacao"
          }
        ],
        "_postman_variable_scope": "globals"
      };
    });
  });

  afterEach(function() {
    TemplateSolver.prototype.readTemplate.restore();
    ParamSolver.prototype.resolve.restore();
  });

  it("Should generate an template only with ordem_solicitacao", function()  {
      sinon.stub(ParamSolver.prototype, 'resolve', function(entries) {
        return {};
      });

      var templateSolver = new TemplateSolver("", "");

      var entries = [];
      var params = new ParamSolver().resolve(entries);

      var generatedTemplate = new GlobalTemplating(templateSolver).createNewmanGlobals(params);
      var expectedTemplate = {
        "id": "1",
        "values": [
          {
            "type": "any",
            "value": ["Finalizar Solicitação"],
            "key": "ordem_solicitacao"
          }
        ],
        "_postman_variable_scope": "globals"
      };

      expect(generatedTemplate).to.be.deep.equal(expectedTemplate);
  });
});
