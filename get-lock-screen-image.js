/* eslint global-require: "off" */
const { isWindows10 } = require('./source/helpers');

if (!isWindows10) {
  console.log('Sorry! This app only runs on Windows 10 platform');
} else {
  require('./source/index');
}
