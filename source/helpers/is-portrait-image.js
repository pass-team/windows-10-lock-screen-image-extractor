const {
  IMAGE_MIN_HEIGHT,
  IMAGE_MIN_WIDTH,
  IMAGE_TYPE_JPG,
  IMAGE_TYPE_PNG,
} = require('../constants');

module.exports = function (height, width, type) {
  return (height >= IMAGE_MIN_WIDTH && width >= IMAGE_MIN_HEIGHT)
    && (type === IMAGE_TYPE_JPG || type === IMAGE_TYPE_PNG)
    && width < height;
};
