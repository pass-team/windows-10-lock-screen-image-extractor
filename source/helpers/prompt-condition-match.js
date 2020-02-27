/**
 *  @Helper
 *  @Input:
 *    - process: the current process run by node
 *  @Output:
 *    - return:
 *      - true: detect no additional arguments from user
 *      - false: detect additional arguments from user
 */
export default function (process) {
  const args = process.argv.splice(2);
  return args.length === 0 || (args.length === 1 && ['-v', '--verbose'].includes(args[0]));
}
