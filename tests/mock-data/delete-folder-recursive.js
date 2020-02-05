const fs = require('fs');

module.exports = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var recursivePath = path + "/" + file;
      if(fs.lstatSync(recursivePath).isDirectory()) { // recurse
        deleteFolderRecursive(recursivePath);
      } else { // delete file
        fs.unlinkSync(recursivePath);
      }
    });
    fs.rmdirSync(path);
  }
};
