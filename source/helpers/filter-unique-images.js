const { PATH_TO_IMAGE } = require('../constants');
const { hashBulkFile } = require('../helpers');

module.exports = function (newImages, oldImages, currentSavingFolder) {
  const newImageHashes = hashBulkFile(PATH_TO_IMAGE, newImages);
  const oldImageHashes = hashBulkFile(currentSavingFolder, oldImages);

  return newImages.reduce((uniqueImages, image, index) => {
    // Check if there were new hashes so it mean new unique images
    if (oldImageHashes.indexOf(newImageHashes[index]) === -1) {
      uniqueImages.push(image);
    }
    return uniqueImages;
  }, []);
};
