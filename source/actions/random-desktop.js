const wallpaper = require('wallpaper');
const chalk = require('chalk');
const {
  getSavePath,
  getFiles,
  taskExecutor,
} = require('../helpers');

module.exports = async function (args, options, logger) {
  logger.info(chalk.cyan('\nStart processing'));
  const currentSavePath = await taskExecutor(getSavePath(), 'Checking saved images..', 400);
  const savedImages = getFiles(currentSavePath);

  if (!savedImages.length) {
    logger.warn(chalk.yellow('\nNo existing images, try to grab the images first, run "node get-lock-screen-image.js -h" for usage'));
  } else {
    await taskExecutor(
      await wallpaper.set(`${currentSavePath.toString()}/${savedImages[Math.floor(Math.random() * savedImages.length)].name}`),
      `Found ${savedImages.length} images. Picking a new desktop..`,
      500,
    );
    logger.info(chalk.green('\nNew desktop background has been set!'));
  }
};
