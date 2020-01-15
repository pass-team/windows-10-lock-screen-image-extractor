const os = require('os');
const appRoot = require('app-root-path');


exports.HOME_DIR = os.homedir();

/* Path to Windows 10's lock screen folder */
exports.PATH_TO_IMAGE = `${os.homedir()}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`;

/* Default image saving folder if not specified */
exports.DEFAULT_SAVE_PATH = `${os.homedir()}\\Pictures\\W10_Spotlight\\`;

exports.WINDOWS10_ALIAS = 'win32';

/* Path to configuration file */
exports.PATH_TO_CONFIG = `${appRoot.path}\\.userconfig`;

exports.ORIENTATION_LANDSCAPE = 'landscape';
exports.ORIENTATION_PORTRAIT = 'portrait';
exports.ORIENTATION_ALL = 'all';

exports.IMAGE_MIN_WIDTH = 1366;
exports.IMAGE_MIN_HEIGHT = 768;
exports.IMAGE_TYPE_PNG = 'png';
exports.IMAGE_TYPE_JPG = 'jpg';

exports.IMAGE_NAME_FORMAT_ORIGIN = 'origin';
exports.IMAGE_NAME_FORMAT_HASH = 'hash';
exports.IMAGE_NAME_FORMAT_DATE = 'date';
