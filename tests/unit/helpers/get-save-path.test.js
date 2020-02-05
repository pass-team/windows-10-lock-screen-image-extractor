const fs = require('fs');
const getSavePath = require('../../../source/helpers/get-save-path');
const setSavePath = require('../../../source/helpers/set-save-path');
const normalizePath = require('../../../source/helpers/normalize-path');
const {
  PATH_TO_CONFIG
} = require('../../../source/constants/index');

describe('Helper - function get-save-path', () => {
  it('Should return path to image saving folder', () => {
    const path = 'D:/saved-folder';
    setSavePath(path);
    expect(getSavePath()).toEqual(normalizePath(path));
  });

  it('Should return empty when no config file found', () => {
    expect(getSavePath()).toEqual('');
  });

  afterEach(function () {
    try {
      fs.unlinkSync(PATH_TO_CONFIG);
    } catch (e) {}
  });
});
