const fs = require('fs');
const normalizePath = require('./normalize-path');

module.exports = function (filesToCopy, source, destination) {
  const destinationPath = normalizePath(destination);
  // Save image and return count on saved files
  return filesToCopy.reduce((count, file, index) => {
    try {
      fs.copyFileSync(source + filesToCopy[index], `${destinationPath + filesToCopy[index]}.jpg`, fs.constants.COPYFILE_EXCL);
      return count + 1;
    } catch (e) {
      if (e.code !== 'EEXIST') console.log(e);
      else return count;
    }
    return count;
  }, 0);
};
