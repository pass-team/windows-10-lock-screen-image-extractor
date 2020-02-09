import nixt from 'nixt/lib/nixt/runner';
import path from 'path';
import deleteFolderRecursive from './../mock-data/delete-folder-recursive';
import fs from "fs";

describe('Feature get-images', () => {
  // Run test inside build folder
  const cwd = path.join(process.cwd(), '/build');
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    fs.unlinkSync(path.join(cwd, '\\.userconfig'));
  });

  it('Should get images with default settings', function (done) {
    nixt()
      .cwd(cwd)
      .run(`get-lock-screen get-images`)
      .stdout(/.*Successfully copy*/)
      .end(done);
  });

  it('Should get images with additional arguments', function (done) {
    const folderName = `D:/w10-startup-lock-screen-extractor-get-image-folder/${Math.floor(Math.random() * Math.floor(10000))}/`;
    nixt()
      .cwd(cwd)
      .run(`get-lock-screen.exe get-images -p=${folderName} -n=hash -o=landscape`)
      .stdout(/.*Successfully copy*/)
      .end(done);
    // Clean up trash files created by test case
    deleteFolderRecursive('D:/w10-startup-lock-screen-extractor-get-image-folder/');
  });
});
