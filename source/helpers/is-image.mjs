import {
  IMAGE_TYPE_JPG,
  IMAGE_TYPE_PNG,
} from '../constants/index.mjs';

/**
 *  @Helper
 *  @Input:
 *    - {type}: a file meta object
 *  @Output:
 *    - return:
 *      - true: if file is an image
 *      - false: otherwise
 */
export default ({ type }) => (type === IMAGE_TYPE_JPG || type === IMAGE_TYPE_PNG);
