/* eslint-disable no-else-return */
import {
  ERROR_CODES,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_ORIGIN,
} from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Input name-pattern from user
 *  @Output:
 *    - return:
 *      - True: name-pattern is valid
 *      - False: name-pattern is invalid
 */

export default (namePattern) => {
  if (new RegExp(`${IMAGE_NAME_FORMAT_ORIGIN}|${IMAGE_NAME_FORMAT_HASH}|${IMAGE_NAME_FORMAT_DATE}|false`)
    .test(namePattern)) {
    return namePattern;
  } else {
    throw new Error(` (${ERROR_CODES.ER01})`);
  }
};
