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
                "values": [{
                    "type": "any",
                    "value": ["Finalizar Solicitação"],
                    "key": "ordem_solicitacao"
                }],
                "_postman_variable_scope": "globals"
            };
        });
    });

    afterEach(function() {
        TemplateSolver.prototype.readTemplate.restore();
        ParamSolver.prototype.resolve.restore();
    });

    it("Should generate an template only with ordem_solicitacao", function() {
        sinon.stub(ParamSolver.prototype, 'resolve', function(entries) {
            return {};
        });

        var templateSolver = new TemplateSolver("", "");

        var entries = [];
        var params = new ParamSolver().resolve(entries);

        var generatedTemplate = new GlobalTemplating(templateSolver, params).createNewmanGlobals();
        var expectedTemplate = {
            "values": [{
                "type": "any",
                "value": ["Finalizar Solicitação"],
                "key": "ordem_solicitacao"
            }],
            "_postman_variable_scope": "globals"
        };

        expect(generatedTemplate).to.be.deep.equal(expectedTemplate);
    });

    it('Shoud clear a value template', function() {
      sinon.stub(ParamSolver.prototype, 'resolve', function(entries) {
        return {};
      });

      var globalTemplating = new GlobalTemplating(null);

      var validValueTemplate = {
        'type': 'any',
        'value': 'dirty',
        'key': 'dirty'
      };

      var cleanValueTemplate = globalTemplating.cleanValueTemplate(validValueTemplate);

      expect(cleanValueTemplate).to.be.deep.equal({
        'type': 'any',
        'value': '',
        'key': ''
      });
    });

    it("Should generate a global variable template file", function() {
        sinon.stub(ParamSolver.prototype, 'resolve', function(entries) {
            return {
                string: 'okay',
                numeric: 1.0,
                logical: true
            };
        })

        var templateSolver = new TemplateSolver('fake_file', 'fake_path');
        var keys = new ParamSolver().resolve([]);
        var globalTemplating = new GlobalTemplating(templateSolver, keys);


        var newmanGlobals = globalTemplating.createNewmanGlobals();

        expect(newmanGlobals).to.be.deep.equal({
            "values": [{
                    "type": "any",
                    "value": ["Finalizar Solicitação"],
                    "key": "ordem_solicitacao"
                }, {
                  "type": "any",
                  "value": 'okay',
                  "key": 'string'
                },
                {
                  "type": 'any',
                  "value": 1.0,
                  "key": 'numeric'
                },
                {
                  "type": 'any',
                  "value": true,
                  "key": 'logical'
                }
            ],
            "_postman_variable_scope": "globals"
        });
    });
});
