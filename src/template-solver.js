
module.exports = {
  readTemplate: function(templateName, path) {
       var jsonFile = require('jsonfile');
       var templatePath =  path + '/resources/' + templateName;

       jsonFile.readFile(templatePath ,{},  function(err, obj) {
         if(err) {
           console.log('Cannot find the main template.\n Error: ' + err);
           return undefined;
         }
         console.log("ICHI" + obj);
         return obj;
       });
 }
};
