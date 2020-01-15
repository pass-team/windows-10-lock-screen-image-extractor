/**
 *  @Helper
 *  @Input:
 *    - process: the current process run by node
 *  @Output:
 *    - return: an array of raw inputs from user
 */
module.exports = function (process) {
  return process.argv.splice(2).length <= 0;
};
