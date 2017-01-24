function TemplateSolver(templateName, path) {
    this._templateName = templateName;
    this._path = path;
}

TemplateSolver.prototype.validate = function(template) {

    if (!template.values) {
        throw new Error('O arquivo de template deve possuir a propriedade \'values\'');
    } else {
      var hasRequiredKey = function(arrValue) {
        return arrValue.find(function(value, index, array) {
          return value.key === 'ordem_solicitacao';
        });
      };

      if(!hasRequiredKey(template.values)) {
        throw new Error('Seu arquivo de template não possui a propriedade \'ordem_solicitacao\' e por este motivo não pode ser processado.');
      }
    }

    return true;
};

TemplateSolver.prototype.readTemplate = function() {
    var jsonFile = require('jsonfile');
    var templatePath = this._path + '/resources/' + this._templateName;
    try {
        return jsonFile.readFileSync(templatePath);
    } catch (err) {
        if (err.code == 'ENOENT') {
            throw new Error('Não foi possível encontrar o arquivo \'' + this._templateName + '\' no caminho \'' + this._path + '\'');
        }
    }
};

module.exports = TemplateSolver;
