/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image is landscape
 *      - false: otherwise
 */
module.exports = ({ width, height }) => (width > height);
