/**
 *  @Helper
 *  @Input:
 *    - path: Input path from user
 *  @Output:
 *    - return: path that has been reformatted
 */
export default function (path) {
  let output = path;
  if (!path.endsWith('\\') && !path.endsWith('/')) {
    output += '\\';
  }
  return output;
}
