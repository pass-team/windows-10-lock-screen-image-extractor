const fs = require('fs');
const { PATH_TO_CONFIG } = require('../constants');
const normalizePath = require('../helpers/normalize-path');

/**
 *  @Helper
 *  @Input:
 *    - path: path to image saving folder
 *  @Output:
 *    - path to image saving folder is written to .userconfig
 */
module.exports = function (path) {
  fs.writeFileSync(PATH_TO_CONFIG, normalizePath(path));
};
