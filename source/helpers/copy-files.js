const fs = require('fs');
const normalizePath = require('./normalize-path');
const {
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_ORIGIN,
} = require('../constants');

module.exports = function (files, source, destination, namePattern) {
  const destinationPath = normalizePath(destination);
  // Save image and return count on saved files
  return files.reduce((count, file, index) => {
    try {
      fs.copyFileSync(
        source + files[index][IMAGE_NAME_FORMAT_ORIGIN],
        `${destinationPath + files[index][namePattern] + (namePattern === IMAGE_NAME_FORMAT_DATE ? (`_${index}`) : '')}.jpg`,
        fs.constants.COPYFILE_EXCL,
      );
      return count + 1;
    } catch (e) {
      if (e.code !== 'EEXIST') console.log(e);
      else return count;
    }
    return count;
  }, 0);
};
