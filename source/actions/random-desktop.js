import chalk from 'chalk';
import {
  getSavePath,
  getFiles,
  taskExecutor,
  filterImages,
} from '../helpers';
import setWallpaper from '../helpers/set-wallpaper';
import { ORIENTATION_LANDSCAPE } from '../constants';
import waitKeyToExit from '../helpers/wait-key-to-exit';

/* Action that randomly set extracted images as desktop background */
export default async function (args, options, logger) {
  /* Steps to handle the action */
  logger.info(chalk.cyan('\nStart processing'));
  /* 1. Retrieve image saving path, stop if no save path found */
  const currentSavePath = await taskExecutor(getSavePath(), 'Checking saved images..', 400);
  if (!currentSavePath) {
    logger.warn(chalk.yellow('\nNo existing images, try getting the images first, run "get-lock-screen -h" for usage'));
    return;
  }
  /* 2. Retrieve saved images */
  const savedImages = getFiles(currentSavePath);

  /**
   *  Inform if no images found
   *  Otherwise randomly set desktop background
   */
  if (!savedImages.length) {
    logger.warn(chalk.yellow('\nNo existing images, try getting the images first, run "get-lock-screen -h" for usage'));
  } else {
    /* Only pick landscape images */
    const savedLandscapeImages = filterImages(savedImages, { orientation: ORIENTATION_LANDSCAPE });
    const pick = `${currentSavePath.toString()}`
      + `/${savedLandscapeImages[Math.floor(Math.random() * savedLandscapeImages.length)].name}`;

    const result = await taskExecutor(
      /* 3. Randomly set desktop background and announce */
      setWallpaper(pick),
      `Found ${savedImages.length} images. Picking a random wallpaper..`,
      500,
    );

    if (result) {
      logger.info(chalk.green('\nNew desktop background has been set!'));
    } else {
      logger.warn(chalk.yellow('\nUnexpected errors!'));
    }
    if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
      waitKeyToExit();
    }
  }
}
