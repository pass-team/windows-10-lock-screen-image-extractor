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
  const processArguments = process.argv.splice(2);
  return (
    processArguments.length === 0
    || (processArguments.length === 1
      && ['-v', '--verbose'].includes(processArguments[0]))
  );
}
