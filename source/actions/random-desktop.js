import chalk from 'chalk';
import {
  getSavePath,
  getFiles,
  taskExecutor,
  filterImages,
  extendedLogger,
} from '../helpers';
import setWallpaper from '../helpers/set-wallpaper';
import {
  ORIENTATION_LANDSCAPE,
  ERROR_CODES,
} from '../constants';
import waitKeyToExit from '../helpers/wait-key-to-exit';

/* Action that randomly set extracted images as desktop background */
export default async function (args, options, logger) {
  // eslint-disable-next-line no-param-reassign
  logger = extendedLogger(logger, 'action:random-desktop');
  /* Steps to handle the action */
  logger.info(chalk.cyan('\nStart processing'));
  /* 1. Retrieve image saving path, stop if no save path found */
  const currentSavePath = await taskExecutor(getSavePath(), 'Checking saved images..', 400);
  if (!currentSavePath) {
    logger.warn(chalk.redBright(`\n${ERROR_CODES.ER05}: No existing images, try getting the images first`));
    logger.info('Type get-lock-screen get-images');
    return;
  }
  logger.debug(`Current image saved folder: ${currentSavePath}`);
  /* 2. Retrieve saved images */
  const savedImages = getFiles(currentSavePath);
  /**
   *  Inform if no images found
   *  Otherwise randomly set desktop background
   */
  if (!savedImages.length) {
    logger.warn(chalk.redBright(`\n${ERROR_CODES.ER04}: No existing images, try getting the images first`));
    logger.info('Type get-lock-screen get-images');
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

    logger.debug(`Choose image: ${pick} as new desktop wallpaper`);

    if (result) {
      logger.info(chalk.green('\nNew desktop background has been set!'));
    } else {
      logger.warn(chalk.redBright(`\n${ERROR_CODES.ER03}: `
        + 'Error setting new desktop wallpaper!'));
      logger.info(chalk.yellow('\nType get-lock-screen random-desktop --help for help'));
    }
    if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
      waitKeyToExit();
    }
  }
}
