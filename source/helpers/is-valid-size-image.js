const {
  IMAGE_MIN_HEIGHT,
  IMAGE_MIN_WIDTH,
} = require('../constants');

/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image has a valid resolution
 *      - false: otherwise
 */
module.exports = ({ height, width }) => (
  (height >= IMAGE_MIN_HEIGHT && width >= IMAGE_MIN_WIDTH)
  || (height >= IMAGE_MIN_WIDTH && width >= IMAGE_MIN_HEIGHT)
);
