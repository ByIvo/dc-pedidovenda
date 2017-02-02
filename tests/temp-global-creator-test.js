var chai = require('chai');
var chaiFiles = require('chai-files');
var sinon = require('sinon');

var expect = chai.expect;
var file = chaiFiles.file;

var TempGlobalCreator = require('./../src/temp-global-creator.js');
var GlobalTemplating = require('./../src/global-templating.js');

describe("TempGlobalCreator", function() {
    var expectedGlobal = {};
    var tempGlobalCreator;

    before(function() {
      expectedGlobal = {
        "values": [
          {
            "type": "any",
            "value": ["Finalizar Solicitação"],
            "key": "ordem_solicitacao"
          },
          {
            "type": "any",
            "value": "test",
            "key": "value"
          },
          {
            "type": "any",
            "value": 2.30,
            "key": "another"
          }
        ],
        "_postman_variable_scope": "globals"
      };
    });

    beforeEach(function() {
        tempGlobalCreator = new TempGlobalCreator();
        sinon.stub(GlobalTemplating.prototype, 'createNewmanGlobals', function() {
            return expectedGlobal;
        });
    });

    afterEach(function() {
        GlobalTemplating.prototype.createNewmanGlobals.restore();
        tempGlobalCreator.removeTempFile();
    });
    
    it("Should create a tempfile just like in parameter", function() {
        expect(file(tempGlobalCreator.filename())).to.exist;
    });


});
