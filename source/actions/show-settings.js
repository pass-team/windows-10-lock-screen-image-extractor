const {
  getSavePath,
} = require('../helpers');

module.exports = function (args, options, logger) {
  const currentSavePath = getSavePath();
  logger.info(`\nCurrent save folder: ${currentSavePath}`);
};
