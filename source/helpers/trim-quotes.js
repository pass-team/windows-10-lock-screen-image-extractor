/**
 *  @Helper
 *  @Input: a random string
 *  @Output: remove all quotes and double quotes inside
 */
module.exports = function (string) {
  return string.replace(/['"]+/g, '');
};
