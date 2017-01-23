var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');

var TemplateSolver = require('./../src/template-solver.js');

describe("TemplateSolver", function() {
    it("Should find a template-test file", function() {
        var templateSolver = new TemplateSolver('template-test.json', __dirname);
        var template = templateSolver.readTemplate();

        expect(template).to.be.deep.equal({
            "id": "1",
            "values": [{
                "type": "any",
                "value": ["Finalizar Solicitação"],
                "key": "ordem_solicitacao"
            }],
            "_postman_variable_scope": "globals"
        });
    });

    it('Should thrown an Error because file cant be found', function() {
        var templateSolver = new TemplateSolver('innexist-template.json', __dirname);
        // templateSolver.readTemplate()
        expect(templateSolver.readTemplate.bind(templateSolver)).to.throw(Error, 'Não foi possível encontrar o arquivo \'innexist-template.json\' no caminho \'' + __dirname + '\'');
    });

    it('Shoud be a valid template', function() {
      var templateSolver = new TemplateSolver('template-test.json', __dirname);
      var template = templateSolver.readTemplate();

      expect(templateSolver.isValid(template)).to.be.true;
    });

    it('Shoul throw invalid template because has no values property ', function() {
        var template = {};
        var templateSolver = new TemplateSolver('', '');

        expect(templateSolver.isValid.bind(templateSolver, template)).to.throw(Error, 'O arquivo de template deve possuir a propriedade \'values\'');
    });

    it('Shoul throw invalid template because has no ordem_solicitacao', function() {
        var template = {
          values: []
        };
        var templateSolver = new TemplateSolver('', '');

        expect(templateSolver.isValid.bind(templateSolver, template)).to.throw(Error, 'Seu arquivo de template não possui a propriedade \'ordem_solicitacao\' e por este motivo não pode ser processado.');
    });
});
