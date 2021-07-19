import fs from 'fs';
import setSavePath from '../../../source/helpers/set-save-path.js';
import normalizePath from '../../../source/helpers/normalize-path.js';
import {
  PATH_TO_CONFIG,
} from '../../../source/constants/index.js';

describe('Helper - Function set-save-path', () => {
  const path = 'D:/saved-folder';

  afterEach(() => {
    if (fs.existsSync(PATH_TO_CONFIG)) {
      fs.unlinkSync(PATH_TO_CONFIG);
    }
  });
  it('Should write save path to .userconfig file', () => {
    setSavePath(path);
    const currentSavePath = fs.readFileSync(PATH_TO_CONFIG).toString();

    expect(currentSavePath).toEqual(normalizePath(path));
  });
});
