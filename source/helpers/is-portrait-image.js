/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image is portrait
 *      - false: otherwise
 */
module.exports = ({ width, height }) => (height > width);
