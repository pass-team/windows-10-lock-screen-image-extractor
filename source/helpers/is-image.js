const {
  IMAGE_TYPE_JPG,
  IMAGE_TYPE_PNG,
} = require('../constants');

/**
 *  @Helper
 *  @Input:
 *    - {type}: a file meta object
 *  @Output:
 *    - return:
 *      - true: if file is an image
 *      - false: otherwise
 */
module.exports = ({ type }) => (type === IMAGE_TYPE_JPG || type === IMAGE_TYPE_PNG);
