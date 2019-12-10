const sizeOf = require('image-size');
const { PATH_TO_IMAGE } = require('../constants');
const isPortraitImage = require('./is-portrait-image');
const isLandscapeImage = require('./is-landscape-image');
const isValidImage = require('./is-valid-image');

module.exports = function (fileStats, constraint) {
  const { orientation } = constraint;
  let images = [];
  switch (orientation) {
    case 'portrait':
      images = fileStats.reduce((imagesToCopy, file) => {
        const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
        if (isPortraitImage(height, width, type)) {
          imagesToCopy.push(file.name);
        }
        return imagesToCopy;
      }, []);
      break;

    case 'landscape':
      images = fileStats.reduce((imagesToCopy, file) => {
        const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
        if (isLandscapeImage(height, width, type)) {
          imagesToCopy.push(file.name);
        }
        return imagesToCopy;
      }, []);
      break;

    default:
      images = fileStats.reduce((imagesToCopy, file) => {
        const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
        if (isValidImage(height, width, type)) {
          imagesToCopy.push(file.name);
        }
        return imagesToCopy;
      }, []);
  }
  return images;
};
