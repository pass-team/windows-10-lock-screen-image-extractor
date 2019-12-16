const fs = require('fs');
const { PATH_TO_CONFIG } = require('../constants');

module.exports = function () {
  let currentSavePath = null;
  try {
    currentSavePath = fs.readFileSync(PATH_TO_CONFIG);
  } catch (e) {
    console.log(e);
  }
  return currentSavePath || 'You haven\'t specified any';
};
