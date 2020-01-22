const wallpaper = require('wallpaper');
const chalk = require('chalk');
const {
  getSavePath,
  getFiles,
  taskExecutor,
  waitKeyToExit,
} = require('../helpers');

/* Action that randomly set extracted images as desktop background */
module.exports = async function (args, options, logger) {
  /* Steps to handle the action */
  logger.info(chalk.cyan('\nStart processing'));
  /* 1. Retrieve image saving path */
  const currentSavePath = await taskExecutor(getSavePath(), 'Checking saved images..', 400);
  /* 2. Retrieve saved images */
  const savedImages = getFiles(currentSavePath);

  /**
   *  Inform if no images found
   *  Otherwise randomly set desktop background
   */
  if (!savedImages.length) {
    logger.warn(chalk.yellow('\nNo existing images, try to grab the images first, run "get-lock-screen -h" for usage'));
  } else {
    await taskExecutor(
      /* 3. Randomly set desktop background and announce */
      await wallpaper.set(`${currentSavePath.toString()}/${savedImages[Math.floor(Math.random() * savedImages.length)].name}`),
      `Found ${savedImages.length} images. Picking a new desktop..`,
      500,
    );
    logger.info(chalk.green('\nNew desktop background has been set!'));
  }
  waitKeyToExit();
};
