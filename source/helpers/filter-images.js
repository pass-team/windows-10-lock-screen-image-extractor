import sizeOf from 'image-size';
import {
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
} from '../constants';

import {
  isImage,
  isValidSizeImage,
  isPortraitImage,
  isLandscapeImage,
} from '.';

/**
 *  @Helper
 *  @Input:
 *    - files: An array of file meta objects that add stats
 *    - constraint: object contains criteria to filter image,
 *                  presently support filter by orientation:
 *      - landscape
 *      - portrait
 *  @Output:
 *    - return array of image meta objects that match criteria
 */
export default function (files, constraint) {
  const { orientation } = constraint;

  /* Measure file stats to pass to filters */
  const images = files
    .map((image) => {
      const uri = image.path + image.name;
      const stats = sizeOf(uri);
      return { ...image, ...stats };
    });

  /**
   *  - Filter images out of windo  ws files
   *  - Then filter images with hd resolution
   */
  const imageValidSize = images.filter(isImage).filter(isValidSizeImage);

  /* Filter images by orientation */
  switch (orientation) {
    case ORIENTATION_PORTRAIT:
      return imageValidSize.filter(isPortraitImage);
    case ORIENTATION_LANDSCAPE:
      return imageValidSize.filter(isLandscapeImage);
    default:
      break;
  }
  return imageValidSize;
};
