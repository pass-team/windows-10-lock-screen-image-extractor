/* eslint-disable no-else-return */
import {
  ERROR_CODES, ORIENTATION_ALL, ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT,
} from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Input orientation from user
 *  @Output:
 *    - return:
 *      - True: orientation is valid
 *      - False: orientation is invalid
 */

export default (orientation) => {
  if (new RegExp(`${ORIENTATION_LANDSCAPE}|${ORIENTATION_PORTRAIT}|${ORIENTATION_ALL}|false`).test(orientation)) {
    return orientation;
  } else {
    throw new Error(` (${ERROR_CODES.ER01})`);
  }
};
