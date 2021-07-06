import fs from 'fs';
import getSavePath from '../../../source/helpers/get-save-path.js';
import setSavePath from '../../../source/helpers/set-save-path.js';
import normalizePath from '../../../source/helpers/normalize-path.js';
import {
  PATH_TO_CONFIG,
} from '../../../source/constants';

describe('Helper - Function get-save-path', () => {
  it('Should return path to image saving folder', () => {
    const path = 'D:/saved-folder';
    setSavePath(path);
    expect(getSavePath()).toEqual(normalizePath(path));
  });

  it('Should return empty when no config file found', () => {
    expect(getSavePath()).toEqual('');
  });

  afterEach(() => {
    if (fs.existsSync(PATH_TO_CONFIG)) {
      fs.unlinkSync(PATH_TO_CONFIG);
    }
  });
});
