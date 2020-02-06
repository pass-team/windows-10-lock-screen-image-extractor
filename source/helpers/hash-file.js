import hasha from 'hasha';

/**
 *  @Helper
 *  @Input:
 *    - uri: path of a file need hashing
 *  @Output:
 *    - return the file hash as string
 */
export default function (uri) {
  return hasha.fromFileSync(uri, { algorithm: 'md5' });
};
