function TempGlobalCreator(workingDirectory){
  this.tempFile = workingDirectory + "/temp/globals.tmp.json";
};

TempGlobalCreator.prototype.createTempGlobals = function(globalTemplating) {
  var jsonFile = require('jsonfile');
  var globalsFile = globalTemplating.createNewmanGlobals();
  
  jsonFile.writeFileSync(this.tempFile, globalsFile);
}

module.exports = TempGlobalCreator;
