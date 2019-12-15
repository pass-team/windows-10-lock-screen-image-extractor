const os = require('os');
const { WINDOWS10_ALIAS } = require('../constants');

module.exports = function () {
  return os.platform() === WINDOWS10_ALIAS;
};
