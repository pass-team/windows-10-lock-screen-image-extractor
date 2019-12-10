const os = require('os');

module.exports = {
  HOME_DIR: os.homedir(),
  PATH_TO_IMAGE: `${os.homedir()}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`,
  DEFAULT_SAVE_PATH: `${os.homedir()}\\Pictures\\W10 Spotlight\\`,

  ORIENTATION_LANDSCAPE: 'landscape',
  ORIENTATION_PORTRAIT: 'portrait',
  ORIENTATION_ALL: 'all',

  IMAGE_MIN_WIDTH: 1366,
  IMAGE_MIN_HEIGHT: 768,
  IMAGE_TYPE_PNG: 'png',
  IMAGE_TYPE_JPG: 'jpg',
};
