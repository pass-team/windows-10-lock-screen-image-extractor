/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image is landscape
 *      - false: otherwise
 */
export default ({ width, height }) => (width > height);
