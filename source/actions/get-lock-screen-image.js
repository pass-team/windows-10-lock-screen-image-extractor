const chalk = require('chalk');
const {
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
} = require('../helpers');
const {
  DEFAULT_SAVE_PATH,
  PATH_TO_IMAGE,
  ORIENTATION_ALL,
  IMAGE_NAME_FORMAT_ORIGIN,
} = require('../constants');

// Default Actions
module.exports = async function (args, options, logger) {
  let pathToSave = trimQuotes(options.path ? options.path : DEFAULT_SAVE_PATH).replace(/\s/g, '_');
  let orientation = trimQuotes(args.orientation ? args.orientation : ORIENTATION_ALL);
  let namePattern = trimQuotes(args.namePattern ? args.namePattern : IMAGE_NAME_FORMAT_ORIGIN);

  // Detect if any command line arguments to decide asking questions or not
  if (promptConditionMatch(process)) {
    const answers = await argumentsPrompt();
    if (answers.path) pathToSave = answers.path;
    if (answers.orientation) orientation = answers.orientation;
    if (answers.namePattern) namePattern = answers.namePattern;
  }
  setSavePath(pathToSave);

  // Main logic
  logger.info(chalk.cyan('\nStart processing'));
  if (!await taskExecutor(createImagesFolder(pathToSave), 'Create saving folder', 250)) {
    logger.error('\nError while create saving folder! Please try again!');
    return;
  }
  const files = await taskExecutor(getFiles(PATH_TO_IMAGE), 'Crawling images', 400);
  const validImages = await taskExecutor(filterImages(files, { orientation }), 'Filtering ones that match your settings', 400);
  const savedImages = getFiles(pathToSave);
  const uniqueImages = await taskExecutor(filterUniqueImages(validImages, savedImages), 'Exclude duplicates', 400);

  if (uniqueImages.length) {
    const count = await taskExecutor(
      copyBulkFiles(uniqueImages, PATH_TO_IMAGE, pathToSave, namePattern),
      `Found ${uniqueImages.length} new images. Copying..`,
      400,
    );
    logger.info(chalk.green(`\nSuccessfully copy ${count} new images!`));
    logger.info(chalk(`Save folder (Ctrl + click to open): ${chalk.underline.cyan(`file://${pathToSave}`)}`));
  } else {
    logger.info(chalk.yellow('\nI found no NEW images :) Better luck next time!'));
  }
};
