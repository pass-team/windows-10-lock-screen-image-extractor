const wallpaper = require('wallpaper');
const chalk = require('chalk');
const {
  getSavePath,
  getFiles,
} = require('../helpers');

module.exports = async function (args, options, logger) {
  logger.info('\nChecking saved images...');
  const currentSavePath = getSavePath();
  const existingImages = getFiles(currentSavePath);

  if (!existingImages.length) {
    logger.warn(chalk.yellow('No existing images, try to grab the images first, run "node get-lock-screen-image.js -h" for usage'));
  } else {
    logger.info(`Found ${existingImages.length} images.`);
    logger.info('Picking a new desktop...');
    await wallpaper.set(`${currentSavePath.toString()}/${existingImages[Math.floor(Math.random() * existingImages.length)]}`);
    logger.info('Done!');
  }
};
