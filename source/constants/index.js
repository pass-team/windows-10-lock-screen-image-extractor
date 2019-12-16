const os = require('os');
const appRoot = require('app-root-path');

exports.HOME_DIR = os.homedir();
exports.PATH_TO_IMAGE = `${os.homedir()}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`;
exports.DEFAULT_SAVE_PATH = `${os.homedir()}\\Pictures\\W10 Spotlight\\`;
exports.WINDOWS10_ALIAS = 'win32';
exports.PATH_TO_CONFIG = `${appRoot.path}\\.userconfig`;

exports.ORIENTATION_LANDSCAPE = 'landscape';
exports.ORIENTATION_PORTRAIT = 'portrait';
exports.ORIENTATION_ALL = 'all';

exports.IMAGE_MIN_WIDTH = 1366;
exports.IMAGE_MIN_HEIGHT = 768;
exports.IMAGE_TYPE_PNG = 'png';
exports.IMAGE_TYPE_JPG = 'jpg';
