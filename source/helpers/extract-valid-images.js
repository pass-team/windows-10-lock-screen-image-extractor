const sizeOf = require('image-size');
const { isValidImage } = require('../helpers');
const { PATH_TO_IMAGE } = require('../constants');

module.exports = function (fileStats) {
  return fileStats.reduce((images, file) => {
    const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
    if (isValidImage(height, width, type)) {
      images.push(file.name);
    }
    return images;
  }, []);
};
