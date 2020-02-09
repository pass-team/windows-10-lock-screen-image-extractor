import path from "path";
import fs from "fs";
import nixt from 'nixt/lib/nixt/runner';
import deleteFolderRecursive from "../mock-data/delete-folder-recursive";

describe('Feature show-settings', () => {
  // Run test inside build folder
  const cwd = path.join(process.cwd(), '\\build');
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    fs.unlinkSync(path.join(cwd, '\\.userconfig'));
  });

  it('Should display path to saving folder', (done) => {
    const folderName = `D:/w10-startup-lock-screen-extractor-get-image-folder/${Math.floor(Math.random() * Math.floor(10000))}/`;
    nixt()
      .cwd(cwd)
      .exec(`get-lock-screen get-images -p=${folderName}`)
      .run('get-lock-screen show-settings')
      .stdout(/.*Image saved folder.*/)
      .end(done);
    // Clean up trash files created by test case
    deleteFolderRecursive('D:/w10-startup-lock-screen-extractor-get-image-folder/');
  });
});
