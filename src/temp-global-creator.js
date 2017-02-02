
function TempGlobalCreator(){
  var tmp = require('tmp');
  this._tmp = tmp.fileSync();
};

TempGlobalCreator.prototype.filename = function() {
  if(this._tmp)  {
    return this._tmp.name;
  }

  return undefined;
};

TempGlobalCreator.prototype.removeTempFile = function() {
  if(this._tmp) {
    this._tmp.removeCallback();
  }
}

TempGlobalCreator.prototype.createTempGlobals = function(globalTemplating) {

};

module.exports = TempGlobalCreator;
