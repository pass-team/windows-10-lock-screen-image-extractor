import fs from 'fs';
import { PATH_TO_CONFIG } from '../constants';
import normalizePath from './normalize-path';

/**
 *  @Helper
 *  @Input:
 *    - path: path to image saving folder
 *  @Output:
 *    - path to image saving folder is written to .userconfig
 */
export default function (path) {
  fs.writeFileSync(PATH_TO_CONFIG, normalizePath(path));
};
