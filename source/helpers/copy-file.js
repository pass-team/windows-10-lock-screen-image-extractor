const fs = require('fs');
const normalizePath = require('./normalize-path');
const {
  IMAGE_NAME_FORMAT_DATE,
} = require('../constants');

module.exports = function (file, src, dest, namePattern, index) {
  const srcUri = normalizePath(src) + file.name;
  const destUri = `${normalizePath(dest) + file[namePattern] + (namePattern === IMAGE_NAME_FORMAT_DATE ? (`_${index}`) : '')}.jpg`;
  fs.copyFileSync(srcUri, destUri, fs.constants.COPYFILE_EXCL);
};
