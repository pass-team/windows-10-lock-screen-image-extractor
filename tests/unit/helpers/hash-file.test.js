import hashFile from '../../../source/helpers/hash-file';

describe('Helper - Function hash-file', () => {
  it('Should return the file hash as string', () => {
    const uri = `${process.cwd()}/tests/mock-assets/a`;
    const hash = hashFile(uri);
    expect(hash).toBeTruthy();
    expect(typeof hash).toBe('string');
    expect(hash).toBe('db7ee7b47dd509ac37bc930322e0f1b3');
  });
});
