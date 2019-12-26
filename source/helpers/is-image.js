const {
  IMAGE_TYPE_JPG,
  IMAGE_TYPE_PNG,
} = require('../constants');

module.exports = ({ type }) => (type === IMAGE_TYPE_JPG || type === IMAGE_TYPE_PNG);
