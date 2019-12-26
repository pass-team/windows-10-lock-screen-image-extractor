const {
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
} = require('../constants');
const {
  hashBulkFile,
  getCurrentDate,
} = require('../helpers');

module.exports = function (newImages, oldImages) {
  const newImageHashes = hashBulkFile(newImages);
  const oldImageHashes = hashBulkFile(oldImages);

  return newImageHashes.reduce((uniqueImages, hash, index) => {
    // Check if there were new hashes so it mean new unique images
    if (oldImageHashes.indexOf(hash) === -1) {
      const newProps = {};
      newProps[IMAGE_NAME_FORMAT_ORIGIN] = newImages[index].name;
      newProps[IMAGE_NAME_FORMAT_HASH] = hash;
      newProps[IMAGE_NAME_FORMAT_DATE] = getCurrentDate();
      uniqueImages.push({
        ...newImages[index],
        ...newProps,
      });
    }
    return uniqueImages;
  }, []);
};
