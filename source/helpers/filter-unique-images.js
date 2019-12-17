const {
  PATH_TO_IMAGE,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
} = require('../constants');
const {
  hashBulkFile,
  getCurrentDate,
} = require('../helpers');

module.exports = function (newImages, oldImages, currentSavingFolder) {
  const newImageHashes = hashBulkFile(PATH_TO_IMAGE, newImages);
  const oldImageHashes = hashBulkFile(currentSavingFolder, oldImages);

  return newImages.reduce((uniqueImages, image, index) => {
    // Check if there were new hashes so it mean new unique images
    if (oldImageHashes.indexOf(newImageHashes[index]) === -1) {
      const newUniqueImage = {};
      newUniqueImage[IMAGE_NAME_FORMAT_ORIGIN] = image;
      newUniqueImage[IMAGE_NAME_FORMAT_HASH] = newImageHashes[index];
      newUniqueImage[IMAGE_NAME_FORMAT_DATE] = getCurrentDate();
      uniqueImages.push(newUniqueImage);
    }
    return uniqueImages;
  }, []);
};
