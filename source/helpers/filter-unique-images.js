// eslint-disable-next-line import/no-cycle

import {
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
} from '../constants';

import {
  hashBulkFile,
  reformatDate,
} from '.';

/**
 *  @Helper
 *  @Input:
 *    - newImages: An array of new image meta objects
 *    - oldImages: An array of old image meta objects
 *  @Output:
 *    - uniqueImages: An array of unique image meta objects
 */
export default function (newImages, oldImages) {
  /* Hash all new and old images  */
  const newImageHashes = hashBulkFile(newImages);
  const oldImageHashes = hashBulkFile(oldImages);

  /* Decide which image is new (unique) by comparing hashes */
  return newImageHashes.reduce((uniqueImages, hash, index) => {
    /* Check if there were new hashes so it mean new unique images */
    if (oldImageHashes.indexOf(hash) === -1) {
      /* Include new fields to meta objects to helps with copying them */
      const newProps = {};
      newProps[IMAGE_NAME_FORMAT_ORIGIN] = newImages[index].name;
      newProps[IMAGE_NAME_FORMAT_HASH] = hash;
      newProps[IMAGE_NAME_FORMAT_DATE] = reformatDate(new Date());
      uniqueImages.push({
        ...newImages[index],
        ...newProps,
      });
    }
    return uniqueImages;
  }, []);
}
