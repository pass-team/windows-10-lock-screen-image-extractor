import hashBulkFile from '../../../source/helpers/hash-bulk-file';
import getFiles from '../../../source/helpers/get-files';

describe('Helper - Function hash-bulk-file', () => {
  it('Should return an array of file hashes', () => {
    // Get files from mock assets
    const files = getFiles(`${process.cwd()}/tests/mock-assets`);
    const expectedHashes = [
      'db7ee7b47dd509ac37bc930322e0f1b3',
      'cd1e461dccf6b9f55a0de6b195662c0a',
      'ce81b0a1dcd69805c69957c5d632a153',
      'f5efb8f08a895f4f5d8a69cb0200f224',
      'd62143732a7a3e0135dc8f6348cc5cbe',
      '55706427975cf355a9e0071790c95f21',
    ];

    const hashes = hashBulkFile(files);
    expect(hashes).toBeTruthy();
    expect(Array.isArray(hashes)).toBe(true);
    expect(hashes).toEqual(expectedHashes);
  });
});
