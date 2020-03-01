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
  validateFormat,
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
  // eslint-disable-next-line no-param-reassign
  logger = logger.child({ caller: 'actions:get-images' });
  logger.log('debug', `User options provided: ${JSON.stringify(options)}`);
  let pathToSave = trimQuotes(
    typeof options.path === 'string'
      ? options.path
      : DEFAULT_SAVE_PATH,
  ).replace(/\s/g, '_');
  let orientation = trimQuotes(
    typeof options.orientation === 'string'
      ? options.orientation
      : ORIENTATION_ALL,
  );
  let namePattern = trimQuotes(
    typeof options.namePattern === 'string'
      ? options.namePattern
      : IMAGE_NAME_FORMAT_ORIGIN,
  );
  const { format } = options;
  logger.log('debug', `User options post-processed: ${JSON.stringify({
    path: pathToSave,
    orientation,
    'name-pattern': namePattern,
  })}`);
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

  // Validate options and throw customized errors
  Promise.all([
    validatePath(pathToSave, logger),
    validateOrientation(orientation, logger),
    validateNamePattern(namePattern, logger),
    validateFormat(format, logger),
  ]).then((checks) => {
    if (!checks.every((check) => check)) {
      process.exit(1);
    }
  });


  /**
   *  Save user settings
   *  Currently, we only save the images's save path
   */
  setSavePath(pathToSave);

  /* Steps to handle the action */
  logger.info(chalk.cyan('\nStart processing'));
  /* 1. Create saving folder if hasn't */
  if (!await taskExecutor(createImagesFolder(pathToSave), 'Create images folder', 250, logger)) {
    logger.error(`\n${ERROR_CODES.RUNTIME_ERROR_001}: `
      + 'Error while creating images folder! The path provided is invalid or being used by other processes');
    logger.error(chalk.whiteBright('Type get-lock-screen --help for help.'));
    return;
  }
  logger.log('debug', `Image folder created successfully at ${pathToSave}`);
  /* 2. Crawl images from windows's image folder */
  const files = await taskExecutor(getFiles(PATH_TO_IMAGE), 'Crawling images', 400, logger);
  logger.log('debug', `Crawled images from ${PATH_TO_IMAGE}, found ${files.length} images`);
  /* 3. Filter image based on user's input */
  const validImages = await taskExecutor(
    filterImages(files, { orientation }),
    'Filtering ones that match your settings',
    400,
    logger,
  );
  logger.log('debug', `Filtered images that is ${orientation}, ${validImages.length} valid images`);
  /* 4. Checkout images you already have */
  const savedImages = getFiles(pathToSave);
  logger.log('debug', `Checked old images in ${pathToSave}, found ${savedImages.length} images`);
  /* 5. Compare the old ones with new so images won't repeat */
  const uniqueImages = await taskExecutor(
    filterUniqueImages(validImages, savedImages),
    'Exclude duplicates',
    400,
    logger,
  );
  logger.log('debug', `Check for duplicates between new and old ones, found ${uniqueImages.length} images:${
    JSON.stringify(uniqueImages, null, 2)}`);
  /* 6. Check if there were unique images (new images) */
  if (uniqueImages.length) {
    /* 7. Copy them to saving folder */
    const count = await taskExecutor(
      copyBulkFiles(uniqueImages, PATH_TO_IMAGE, pathToSave, namePattern, logger),
      `Found ${uniqueImages.length} new images. Copying..`,
      400,
      logger,
    );
    /* 8. Announce the result */
    logger.info(`\nSuccessfully copy ${count} new images!`, { isMessage: true });
    logger.info(
      `Save folder (Ctrl + click to open): ${chalk.underline.cyan(`file://${pathToSave}`)}`, { isMessage: true },
    );
  } else {
    logger.warn('\nI found no NEW images :) Better luck next time!', { isMessage: true });
  }

  console.log(logger.transports[0].state);

  if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
    waitKeyToExit();
  }
}
