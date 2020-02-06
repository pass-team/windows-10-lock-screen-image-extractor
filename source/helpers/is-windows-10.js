import os from 'os';
import { WINDOWS10_ALIAS } from '../constants';

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
};
