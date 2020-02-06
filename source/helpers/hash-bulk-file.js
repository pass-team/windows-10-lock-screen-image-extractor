import hashFile from './hash-file';

/**
 *  @Helper
 *  @Input:
 *    - files: an array of file meta objects
 *  @Output:
 *    - return an array of file hashes
 */
export default function (files) {
  return files.map(({ path, name }) => hashFile(path + name));
};
