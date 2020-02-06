const fs = require('fs');
const setSavePath = require('../../../source/helpers/set-save-path');
const normalizePath = require('../../../source/helpers/normalize-path');
const {
  PATH_TO_CONFIG
} = require('../../../source/constants');

describe('Helper - Function set-save-path', () => {
  const path = 'D:/saved-folder';
  setSavePath(path);

  afterEach(function () {
    try {
      fs.unlinkSync(PATH_TO_CONFIG);
    } catch (e) {}
  });
  it('Should write save path to .userconfig file', () => {
    const currentSavePath = fs.readFileSync(PATH_TO_CONFIG).toString();
    expect(currentSavePath).toEqual(normalizePath(path));
  });
});
