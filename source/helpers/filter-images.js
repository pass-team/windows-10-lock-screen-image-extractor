const sizeOf = require('image-size');
const {
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
} = require('../constants');
const {
  isImage,
  isValidSizeImage,
  isPortraitImage,
  isLandscapeImage,
} = require('../helpers');

module.exports = function (files, constraint) {
  const { orientation } = constraint;
  const images = files
    .map((image) => {
      const uri = image.path + image.name;
      const stats = sizeOf(uri);
      return {
        ...image,
        ...stats,
      };
    });

  const imageValidSize = images.filter(isImage).filter(isValidSizeImage);

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
