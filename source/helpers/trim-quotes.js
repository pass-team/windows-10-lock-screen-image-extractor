/**
 *  @Helper
 *  @Input: a random string
 *  @Output: remove all quotes and double quotes inside
 */
export default function (string) {
  return string.replace(/['"]+/g, '');
};
