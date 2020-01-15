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
  const files = fs.readdirSync(filePath);
  return files.map((file) => ({
    name: file,
    path: filePath,
  }));
};
