/* eslint max-len: "off" */

import os from 'os';

/* Path to Windows 10's lock screen folder */
const PATH_TO_IMAGE = `${os.homedir()}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`;

/* Default image saving folder if not specified */
const DEFAULT_SAVE_PATH = `${os.homedir()}\\Pictures\\W10_Spotlight\\`;

const WINDOWS10_ALIAS = 'win32';

/* Path to configuration file */
const PATH_TO_CONFIG = `${process.cwd()}\\.userconfig`;

const ORIENTATION_LANDSCAPE = 'landscape';
const ORIENTATION_PORTRAIT = 'portrait';
const ORIENTATION_ALL = 'all';

const IMAGE_MIN_WIDTH = 1366;
const IMAGE_MIN_HEIGHT = 768;
const IMAGE_TYPE_PNG = 'png';
const IMAGE_TYPE_JPG = 'jpg';

const IMAGE_NAME_FORMAT_ORIGIN = 'origin';
const IMAGE_NAME_FORMAT_HASH = 'hash';
const IMAGE_NAME_FORMAT_DATE = 'date';

/* Path to configuration file */
const MENU_OPTIONS = Object.freeze({
  GET_LOCK_SCREEN: '1. Get lock screen images',
  RANDOM_DESKTOP: '2. Randomize desktop background',
  CURRENT_SETTINGS: '3. Show current user settings',
  QUIT: '4. Quit',
});

/* Error codes */
const ERROR_CODES = {
  VALIDATION_ERROR_001: 'VALIDATION_ERROR_001',
  VALIDATION_ERROR_002: 'VALIDATION_ERROR_002',
  VALIDATION_ERROR_003: 'VALIDATION_ERROR_003',
  RUNTIME_ERROR_001: 'RUNTIME_ERROR_001',
  RUNTIME_ERROR_002: 'RUNTIME_ERROR_002',
  RUNTIME_ERROR_003: 'RUNTIME_ERROR_003',
  RUNTIME_ERROR_004: 'RUNTIME_ERROR_004',
  EXCEPTION_001: 'EXCEPTION_001',
};

const OUTPUT_FORMAT_JSON = 'json';
const OUTPUT_FORMAT_TEXT = 'text';

export {
  PATH_TO_IMAGE,
  DEFAULT_SAVE_PATH,
  WINDOWS10_ALIAS,
  PATH_TO_CONFIG,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
  ORIENTATION_ALL,
  IMAGE_MIN_WIDTH,
  IMAGE_MIN_HEIGHT,
  IMAGE_TYPE_PNG,
  IMAGE_TYPE_JPG,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_DATE,
  MENU_OPTIONS,
  ERROR_CODES,
  OUTPUT_FORMAT_JSON,
  OUTPUT_FORMAT_TEXT,
};
