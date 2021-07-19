import os from 'os';
import isWindows10 from '../../../source/helpers/is-windows-10.js';

describe('Helper - Function is-windows-10', () => {
  it('Should return true if platform is win32', () => {
    expect(isWindows10()).toEqual(true);
  });

  it('Should return false if platform is not win32', () => {
    os.platform = jest.fn().mockReturnValue('linux');
    expect(isWindows10()).toEqual(false);
  });
});
