const isWindows10 = require('../../../source/helpers/is-windows-10');
const os = require('os');

describe('Helper - Function is-windows-10', () => {
  it('Should return true if platform is win32', () => {
    expect(isWindows10()).toEqual(true);
  });

  it('Should return false if platform is not win32', () => {
    os.platform = jest.fn().mockReturnValue('linux');
    expect(isWindows10()).toEqual(false);
  });
});
