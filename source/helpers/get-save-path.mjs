import fs from 'fs';
import PATH_TO_CONFIG from '../constants/index.mjs';

/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - path to image saving folder that user specified in the last run
 */
export default function () {
  let currentSavePath = null;
  try {
    currentSavePath = fs.readFileSync(PATH_TO_CONFIG).toString();
  } catch (e) {
    return '';
  }
  return currentSavePath;
};
