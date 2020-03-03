import chalk from 'chalk';
import {
  getSavePath,
  getFiles,
  taskExecutor,
  filterImages,
  validateFormat,
  printJsonOutput, trimQuotes,
} from '../helpers';
import setWallpaper from '../helpers/set-wallpaper';
import {
  ORIENTATION_LANDSCAPE,
  ERROR_CODES, OUTPUT_FORMAT_TEXT,
} from '../constants';

/* Action that randomly set extracted images as desktop background */
export default async function (args, options, logger) {
  // eslint-disable-next-line no-param-reassign
  logger = logger.child({ caller: 'actions:random-desktop' });
  const format = trimQuotes(typeof options.format === 'string'
    ? options.format
    : OUTPUT_FORMAT_TEXT);

  if (!validateFormat(format, logger)) {
    return printJsonOutput(logger, format);
  }

  /* Steps to handle the action */
  logger.info(chalk.cyan('\nStart processing'));
  /* 1. Retrieve image saving path, stop if no save path found */
  const currentSavePath = await taskExecutor(getSavePath(), 'Checking saved images..', 400, logger);
  if (!currentSavePath) {
    logger.error(
      'No existing images, try getting the images first.'
      + `${chalk.white('\nType get-lock-screen get-images to get images')}`,
      { errorCode: ERROR_CODES.RUNTIME_ERROR_003 },
    );
    return printJsonOutput(logger, format);
  }
  logger.log('debug', `Current image saved folder: ${currentSavePath}`);
  /* 2. Retrieve saved images */
  const savedImages = getFiles(currentSavePath);
  /**
   *  Inform if no images found
   *  Otherwise randomly set desktop background
   */
  if (!savedImages.length) {
    logger.error(
      'No existing images, try getting the images first.'
      + `${chalk.white('\nType get-lock-screen get-images')}`,
      { errorCode: ERROR_CODES.RUNTIME_ERROR_003 },
    );
    return printJsonOutput(logger, format);
  }
  /* Only pick landscape images */
  const savedLandscapeImages = filterImages(savedImages, { orientation: ORIENTATION_LANDSCAPE });
  const pick = `${currentSavePath.toString()}`
    + `/${savedLandscapeImages[Math.floor(Math.random() * savedLandscapeImages.length)].name}`;

  const result = await taskExecutor(
    /* 3. Randomly set desktop background and announce */
    setWallpaper(pick),
    `Found ${savedImages.length} images. Picking a random wallpaper..`,
    500,
    logger,
  );

  logger.log('debug', `Choose image: ${pick} as new desktop wallpaper`);

  if (result) {
    logger.info('\nNew desktop background has been set!');
  } else {
    logger.error(
      `Error setting new desktop wallpaper!${
        chalk.white('\nType get-lock-screen random-desktop --help for help')}`,
      { errorCode: ERROR_CODES.RUNTIME_ERROR_002 },
    );
  }
  return printJsonOutput(logger, format);
}
