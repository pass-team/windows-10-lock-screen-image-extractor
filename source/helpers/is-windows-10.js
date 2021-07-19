import os from 'os';
// eslint-disable-next-line import/extensions
import { WINDOWS10_ALIAS } from '../constants/index.js';

/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - return:
 *      - true: if platform is windows 10
 *      - false: otherwise
 */
export default function () {
  return os.platform() === WINDOWS10_ALIAS;
}
