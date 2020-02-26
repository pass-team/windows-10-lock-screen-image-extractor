import chalk from 'chalk';

import {
  getFiles,
  filterImages,
  filterUniqueImages,
  createImagesFolder,
  copyBulkFiles,
  trimQuotes,
  setSavePath,
  promptConditionMatch,
  argumentsPrompt,
  taskExecutor,
  validatePath,
  validateOrientation,
  validateNamePattern,
} from '../helpers';

import {
  DEFAULT_SAVE_PATH,
  PATH_TO_IMAGE,
  ORIENTATION_ALL,
  IMAGE_NAME_FORMAT_ORIGIN,
  ERROR_CODES,
} from '../constants';
import waitKeyToExit from '../helpers/wait-key-to-exit';

/* Action that handle extracting lock screen from windows */
export default async function (args, options, logger) {
  let pathToSave = trimQuotes(options.path ? options.path : DEFAULT_SAVE_PATH).replace(/\s/g, '_');
  let orientation = trimQuotes(options.orientation ? options.orientation : ORIENTATION_ALL);
  let namePattern = trimQuotes(options.namePattern ? options.namePattern : IMAGE_NAME_FORMAT_ORIGIN);
  /**
   *  Ask user questions to customize the action
   *  promptConditionMatch(process): check the number of process arguments to decide whether to ask:
   *    - number of arguments === 0 => Ask
   *    - Otherwise: Skip
   */
  if (promptConditionMatch(process)) {
    const answers = await argumentsPrompt();
    if (answers.path) pathToSave = answers.path;
    if (answers.orientation) orientation = answers.orientation;
    if (answers.namePattern) namePattern = answers.namePattern;
  }

  validatePath(pathToSave);
  validateOrientation(orientation);
  validateNamePattern(namePattern);

  /**
   *  Save user settings
   *  Currently, we only save the images's save path
   */
  setSavePath(pathToSave);

  /* Steps to handle the action */
  logger.info(chalk.cyan('\nStart processing'));
  /* 1. Create saving folder if hasn't */
  if (!await taskExecutor(createImagesFolder(pathToSave), 'Create images folder', 250)) {
    logger.warn(chalk.redBright(`\n${ERROR_CODES.ER02}: `
      + 'Error while creating images folder! The path provided is invalid or being used by other processes'));
    logger.info('Type get-lock-screen --help for help.');
    return;
  }
  /* 2. Crawl images from windows's image folder */
  const files = await taskExecutor(getFiles(PATH_TO_IMAGE), 'Crawling images', 400);
  /* 3. Filter image based on user's input */
  const validImages = await taskExecutor(
    filterImages(files, { orientation }),
    'Filtering ones that match your settings',
    400,
  );
  /* 4. Checkout images you already have */
  const savedImages = getFiles(pathToSave);
  /* 5. Compare the old ones with new so images won't repeat */
  const uniqueImages = await taskExecutor(
    filterUniqueImages(validImages, savedImages),
    'Exclude duplicates',
    400,
  );
  /* 6. Check if there were unique images (new images) */
  if (uniqueImages.length) {
    /* 7. Copy them to saving folder */
    const count = await taskExecutor(
      copyBulkFiles(uniqueImages, PATH_TO_IMAGE, pathToSave, namePattern),
      `Found ${uniqueImages.length} new images. Copying..`,
      400,
    );
    /* 8. Announce the result */
    logger.info(chalk.green(`\nSuccessfully copy ${count} new images!`));
    logger.info(chalk(`Save folder (Ctrl + click to open): ${chalk.underline.cyan(`file://${pathToSave}`)}`));
  } else {
    logger.info(chalk.yellow('\nI found no NEW images :) Better luck next time!'));
  }
  if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
    waitKeyToExit();
  }
}
