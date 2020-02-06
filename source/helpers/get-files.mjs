import fs from 'fs';
import normalizePath from './normalize-path.mjs';

/**
 *  @Helper
 *  @Input:
 *    - path: path to containing folder
 *  @Output:
 *    - An array of file meta objects
 */
export default function (path) {
  /* Process the path, so different path format won't break nodejs readdirSync api */
  const filePath = normalizePath(path);
  try {
    return fs.readdirSync(filePath).map((file) => ({
      name: file,
      path: filePath,
    }));
  } catch (e) {
    return [];
  }
};
