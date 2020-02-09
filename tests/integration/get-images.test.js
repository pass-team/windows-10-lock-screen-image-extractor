import nixt from 'nixt/lib/nixt/runner';
import path from 'path';

describe('Feature get-images', () => {
  const cwd = path.join(process.cwd(), '/build');

  it('Should get images with default settings', function (done) {
    nixt()
      .cwd(cwd)
      .exec('cd build')
      .stdin('\n')
      .run('get-lock-screen get-images')
      .stdout(/.*Save folder.*/)
      .end(done);
  });

  it('Should get images with additional arguments', function (done) {
    const folderName = Math.floor(Math.random() * Math.floor(10000));
    nixt()
      .cwd(cwd)
      .exec('cd build')
      .stdin('\n')
      .run(`get-lock-screen get-images -p=D:/${folderName} -o=landscape -n=hash`)
      .stdout(/.*Save folder.*/)
      .end(done);
  });
});
