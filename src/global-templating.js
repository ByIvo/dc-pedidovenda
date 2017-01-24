function GlobalTemplating(templateSolver) {
  this._templateSolver = templateSolver;
}

GlobalTemplating.prototype.cleanValueTemplate = function(validValueTemplate) {
  var cleanValueTemplate = Object.assign({}, validValueTemplate);

  cleanValueTemplate.key = '';
  cleanValueTemplate.value = '';

  return cleanValueTemplate;
};

GlobalTemplating.prototype.createNewmanGlobals = function(params) {
  var templateFile = this._templateSolver.readTemplate();
  this._templateSolver.validate(templateFile);

  var arrValues = templateFile.values;
  var valueTemplate = this.cleanValueTemplate(arrValues[0]);

  for(var property in params) {
    if(params.hasOwnProperty(property)) {
      var cleanedTemplate = Object.assign({}, valueTemplate);
      cleanedTemplate.key = property;
      cleanedTemplate.value = params[property];

      arrValues.push(cleanedTemplate);
    }
  }

  return templateFile;
}

module.exports = GlobalTemplating;
