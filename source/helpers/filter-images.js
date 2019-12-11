const {
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
} = require('../constants');
const {
  extractPortraitImages,
  extractLandscapeImages,
  extractValidImages,
} = require('../helpers');

module.exports = function (fileStats, constraint) {
  const { orientation } = constraint;
  let images = [];
  switch (orientation) {
    case ORIENTATION_PORTRAIT:
      images = extractPortraitImages(fileStats);
      break;
    case ORIENTATION_LANDSCAPE:
      images = extractLandscapeImages(fileStats);
      break;
    default:
      images = extractValidImages(fileStats);
  }
  return images;
};
