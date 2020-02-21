/* eslint-disable no-else-return, no-useless-escape */
import { ERROR_CODES } from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Input path from user
 *  @Output:
 *    - return:
 *      - path: If the path is valid
 *      - throw new Error if the path is invalid
 */

export default (path) => {
  if (new RegExp(/[A-Z]:[\/\\].+|false/).test(path)) {
    return path;
  } else {
    throw new Error(` (${ERROR_CODES.ER01})`);
  }
};
