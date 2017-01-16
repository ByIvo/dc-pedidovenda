function ParamSolver(){}

ParamSolver.prototype.resolve = function(entries) {
  var result = {};
  entries.forEach(function(item, index, arr) {
    var pair = item.split("=");
    if(pair.length === 1) return;

    result[pair[0]] = pair[1];
  });

  return result;
};

module.exports = ParamSolver;
