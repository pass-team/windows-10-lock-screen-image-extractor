const {
  retrieveFilesName,
  getBulkFileStat,
  filterFilesToCopy,
  createSavingFolder,
  copyImages,
} = require('../helpers');
const { trimQuotes } = require('../utils');
const { DEFAULT_SAVE_PATH, PATH_TO_IMAGE } = require('../constants');

// Default Actions
module.exports = (args, options, logger) => {
  const pathToSave = trimQuotes(options.path ? options.path : DEFAULT_SAVE_PATH);
  const orientation = trimQuotes(args.orientation ? args.orientation : 'all');

  // Main logic
  const files = retrieveFilesName(PATH_TO_IMAGE);
  const fileStats = getBulkFileStat(files);
  const filesToCopy = filterFilesToCopy(fileStats, { orientation });
  if (!createSavingFolder(pathToSave)) {
    logger.error('\nError while create saving folder! Please try again!');
    return;
  }
  const count = copyImages(filesToCopy, pathToSave);

  // Announcements
  if (count) {
    logger.info(`\nSuccessfully copy ${count} new images!`);
    logger.info(`Check out now: ${pathToSave}`);
  } else logger.warn('\nI found no NEW images :) Better luck next time!');
};
