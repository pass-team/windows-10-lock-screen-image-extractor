const fs = require('fs');
const { normalizePath } = require('../helpers');

/**
 *  @Helper
 *  @Input:
 *    - path: path to containing folder
 *  @Output:
 *    - An array of file meta objects
 */
module.exports = function (path) {
  /* Process the path, so different path format won't break nodejs readdirSync api */
  const filePath = normalizePath(path);
  try {
    return fs.readdirSync(filePath).map((file) => ({
      name: file,
      path: filePath,
    }));
  } catch (e) {
    return [];
  }
};
