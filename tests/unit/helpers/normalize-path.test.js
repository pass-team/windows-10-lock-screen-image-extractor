const normalizePath = require('../../../source/helpers/normalize-path');

describe('Helper - Function normalize-path', () => {
  const mockPath = `${process.cwd()}/tests/mock-assets`;

  it('Should reformat the path string', () => {
    expect(normalizePath(mockPath)).toEqual(`${process.cwd()}/tests/mock-assets\\`);
  });
});
