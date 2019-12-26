const {
  IMAGE_MIN_HEIGHT,
  IMAGE_MIN_WIDTH,
} = require('../constants');

module.exports = ({ height, width }) => (
  (height >= IMAGE_MIN_HEIGHT && width >= IMAGE_MIN_WIDTH)
  || (height >= IMAGE_MIN_WIDTH && width >= IMAGE_MIN_HEIGHT)
);
