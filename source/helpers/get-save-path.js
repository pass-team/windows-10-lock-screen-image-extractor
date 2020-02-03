const fs = require('fs');
const { PATH_TO_CONFIG } = require('../constants');

/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - path to image saving folder that user specified in the last run
 */
module.exports = function () {
  let currentSavePath = null;
  try {
    currentSavePath = fs.readFileSync(PATH_TO_CONFIG).toString();
  } catch (e) {
    return '';
  }
  return currentSavePath;
};
