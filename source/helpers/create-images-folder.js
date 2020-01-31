const fs = require('fs');

/**
 *  @Helper
 *  @Input:
 *    - path: path to image folder
 *  @Output:
 *    - true if create successfully or EEXIST exception occurs: means the folder already existed
 *    - false otherwise
 */
module.exports = function (path) {
  try {
    fs.mkdirSync(path, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') return false;
  }
  return true;
};
