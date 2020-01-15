/**
 *  @Helper
 *  @Input:
 *    - path: Input path from user
 *  @Output:
 *    - return: path that has been reformatted
 */
module.exports = function (path) {
  let output = path;
  if (!path.endsWith('\\') && !path.endsWith('/')) {
    output += '\\';
  }
  return output;
};
