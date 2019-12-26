const fs = require('fs');
const { PATH_TO_CONFIG } = require('../constants');

module.exports = function () {
  let currentSavePath = null;
  try {
    currentSavePath = fs.readFileSync(PATH_TO_CONFIG).toString();
  } catch (e) {
    return 'You haven\'t specified any';
  }
  return currentSavePath || 'You haven\'t specified any';
};
