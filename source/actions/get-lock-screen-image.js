const {
  getFiles,
  extractFilesStat,
  filterImages,
  filterUniqueImages,
  createImagesFolder,
  copyFiles,
  trimQuotes,
  setSavePath,
  extractProcessArguments,
  argumentsPrompt,
} = require('../helpers');
const {
  DEFAULT_SAVE_PATH,
  PATH_TO_IMAGE,
  ORIENTATION_ALL,
  IMAGE_NAME_FORMAT_ORIGIN,
} = require('../constants');

// Default Actions
module.exports = async function (args, options, logger) {
  let pathToSave = trimQuotes(options.path ? options.path : DEFAULT_SAVE_PATH);
  let orientation = trimQuotes(args.orientation ? args.orientation : ORIENTATION_ALL);
  let namePattern = trimQuotes(args.namePattern ? args.namePattern : IMAGE_NAME_FORMAT_ORIGIN);

  // Detect if any command line arguments to decide asking questions or not
  const cmdArgs = extractProcessArguments(process);
  if (cmdArgs.length === 0) {
    const answers = await argumentsPrompt();
    if (answers) {
      if (answers.path) pathToSave = answers.path;
      if (answers.orientation) orientation = answers.orientation;
      if (answers.namePattern) namePattern = answers.namePattern;
    }
  }

  setSavePath(pathToSave);
  // Main logic
  if (!createImagesFolder(pathToSave)) {
    logger.error('\nError while create saving folder! Please try again!');
    return;
  }
  const files = getFiles(PATH_TO_IMAGE);
  const fileStats = extractFilesStat(files);
  const newImages = filterImages(fileStats, { orientation });
  const oldImages = getFiles(pathToSave);
  const uniqueImages = filterUniqueImages(newImages, oldImages, pathToSave);
  const count = copyFiles(uniqueImages, PATH_TO_IMAGE, pathToSave, namePattern);
  // Announcements
  if (count) {
    logger.info(`\nSuccessfully copy ${count} new images!`);
    logger.info(`Check out now: ${pathToSave}`);
  } else logger.warn('\nI found no NEW images :) Better luck next time!');
};
