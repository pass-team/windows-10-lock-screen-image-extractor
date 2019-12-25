exports.isPortraitImage = require('./is-portrait-image');
exports.isLandscapeImage = require('./is-landscape-image');
exports.isValidImage = require('./is-valid-image');
exports.isWindows10 = require('./is-windows-10');

exports.extractLandscapeImages = require('./extract-landscape-images');
exports.extractPortraitImages = require('./extract-portrait-images');
exports.extractValidImages = require('./extract-valid-images');

exports.trimQuotes = require('./trim-quotes');
exports.normalizePath = require('./normalize-path');
exports.getCurrentDate = require('./get-current-date');
exports.promptConditionMatch = require('./prompt-condition-match');
exports.argumentsPrompt = require('./arguments-prompt');

exports.getFiles = require('./get-files');
exports.extractFilesStat = require('./extract-files-stat');
exports.hashFile = require('./hash-file');
exports.hashBulkFile = require('./hash-bulk-file');
exports.filterImages = require('./filter-images');
exports.filterUniqueImages = require('./filter-unique-images');
exports.createImagesFolder = require('./create-images-folder');
exports.copyFiles = require('./copy-files');
exports.setSavePath = require('./set-save-path');
exports.getSavePath = require('./get-save-path');

exports.taskExecutor = require('./task-executor');
