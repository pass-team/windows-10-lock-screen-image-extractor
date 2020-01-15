const os = require('os');
const { WINDOWS10_ALIAS } = require('../constants');

/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - return:
 *      - true: if platform is windows 10
 *      - false: otherwise
 */
module.exports = function () {
  return os.platform() === WINDOWS10_ALIAS;
};
