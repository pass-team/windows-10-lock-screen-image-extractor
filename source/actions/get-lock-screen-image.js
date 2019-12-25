const chalk = require('chalk');
const {
  getFiles,
  extractFilesStat,
  filterImages,
  filterUniqueImages,
  createImagesFolder,
  copyFiles,
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
  if (!createImagesFolder(pathToSave)) {
    logger.error('\nError while create saving folder! Please try again!');
    return;
  }

  logger.info(chalk.cyan('\nStart processing'));
  const files = await taskExecutor(getFiles(PATH_TO_IMAGE), 'Crawling images', 500);
  const fileStats = await taskExecutor(extractFilesStat(files), 'Filtering valid ones', 500);
  const newImages = filterImages(fileStats, { orientation });
  const oldImages = getFiles(pathToSave);
  const uniqueImages = filterUniqueImages(newImages, oldImages, pathToSave);

  if (uniqueImages.length) {
    const count = await taskExecutor(copyFiles(uniqueImages, PATH_TO_IMAGE, pathToSave, namePattern), `Found ${uniqueImages.length} new images. Copying..`, 500);
    logger.info(chalk.green(`\nSuccessfully copy ${count} new images!`));
    logger.info(chalk(`Save folder (Ctrl + click to open): ${chalk.underline.cyan(`file://${pathToSave}`)}`));
  } else {
    logger.info(chalk.yellow('\nI found no NEW images :) Better luck next time!'));
  }
};
