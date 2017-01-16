var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');

var ParamSolver = require('./../src/param-solver.js');
var GlobalTemplating = require('./../src/global-templating.js');
var templateSolver = require('./../src/template-solver.js');
/*
describe('GlobalTemplating', function() {

  beforeEach(function() {
    sinon.stub(templateSolver, 'readTemplate', function(templateName, scope) {
      console.log("STUBE CACILDS");
      return {
        "id": "1",
        "values": [
          {
            "type": "any",
            "value": ["Finalizar Solicitação"],
            "key": "ordem_solicitacao"
          }
        ],
        "_postman_variable_scope": "globals",
        "_postman_exported_at": new Date().toISOString()
      };
    });
  });

  afterEach(function() {
    ParamSolver.resolve.restore();
    templateSolver.readTemplate.restore();
  });

  it("Should generate an template only with ordem_solicitacao", function()  {
      sinon.stub(ParamSolver, 'resolve', function(entries) {
        return {};
      });

      var entries = [];
      var params = new ParamSolver().resolve(entries);

      var template = new GlobalTemplating().createNewmanGlobals(params);
  });
});
*/
