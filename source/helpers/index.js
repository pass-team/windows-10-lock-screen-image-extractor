import isPortraitImage from './is-portrait-image';
import isLandscapeImage from './is-landscape-image';
import isValidSizeImage from './is-valid-size-image';
import isImage from './is-image';
import isWindows10 from './is-windows-10';

import trimQuotes from './trim-quotes';
import normalizePath from './normalize-path';
import reformatDate from './reformat-date';
import promptConditionMatch from './prompt-condition-match';
import argumentsPrompt from './arguments-prompt';

import getFiles from './get-files';
import hashFile from './hash-file';
import hashBulkFile from './hash-bulk-file';
import filterImages from './filter-images';
import filterUniqueImages from './filter-unique-images';
import createImagesFolder from './create-images-folder';
import copyFiles from './copy-file';
import copyBulkFiles from './copy-bulk-files';
import setSavePath from './set-save-path';
import getSavePath from './get-save-path';

import taskExecutor from './task-executor';
import waitKeyToExit from './wait-key-to-exit';

import validatePath from './validate-path';
import validateOrientation from './validate-orientation';
import validateNamePattern from './validate-name-pattern';
import validateOutput from './validate-output';

import extendLogger from './extend-logger';
import parseJsonToArgs from './parse-json-to-args';
import isOutputFormatProvided from './is-output-format-provided';

export {
  isPortraitImage,
  isLandscapeImage,
  isValidSizeImage,
  isImage,
  isWindows10,
  trimQuotes,
  normalizePath,
  reformatDate,
  promptConditionMatch,
  argumentsPrompt,
  getFiles,
  hashFile,
  hashBulkFile,
  filterImages,
  filterUniqueImages,
  createImagesFolder,
  copyFiles,
  copyBulkFiles,
  setSavePath,
  getSavePath,
  taskExecutor,
  validatePath,
  validateOrientation,
  validateNamePattern,
  validateOutput,
  extendLogger,
  parseJsonToArgs,
  isOutputFormatProvided,
  waitKeyToExit,
};
