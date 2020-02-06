import fs from 'fs';
import normalizePath from './normalize-path';
import {
  IMAGE_NAME_FORMAT_DATE,
} from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - file: file meta objects
 *    - src: path to source folder
 *    - dest: path to destination folder
 *    - pattern: file name format to be save as, presently support
 *      - hash: content hash
 *      - date: current date
 *      - origin: the original file name
 *    - index:  number appended to file name when using the `date` name pattern
 *              because bulk of files will share the same date
 *  @Output:
 *    - file are copy to dest folder
 */
export default function (file, src, dest, namePattern, index) {
  /* Process the path, so different path format won't break nodejs copyFileSync api */
  const srcUri = normalizePath(src) + file.name;
  const destUri = `${
    normalizePath(dest)
    + file[namePattern]
    + (namePattern === IMAGE_NAME_FORMAT_DATE ? (`_${index}`) : '')
  }.jpg`;
  fs.copyFileSync(srcUri, destUri, fs.constants.COPYFILE_EXCL);
}
