/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image is portrait
 *      - false: otherwise
 */
export default ({ width, height }) => (height > width);
