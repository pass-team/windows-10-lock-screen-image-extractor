const hasha = require('hasha');

/**
 *  @Helper
 *  @Input:
 *    - uri: path of a file need hashing
 *  @Output:
 *    - return the file hash as string
 */
module.exports = function (uri) {
  return hasha.fromFileSync(uri, { algorithm: 'md5' });
};
