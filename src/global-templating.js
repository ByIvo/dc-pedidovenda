function GlobalTemplating(templateSolver) {
  this._templateSolver = templateSolver;
}

GlobalTemplating.prototype.createNewmanGlobals = function(params) {
  var template = this._templateSolver.readTemplate();

  return template;
}

module.exports = GlobalTemplating;
