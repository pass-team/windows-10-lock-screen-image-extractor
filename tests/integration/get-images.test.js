import nixt from 'nixt/lib/nixt/runner';

describe('Feature get-images', () => {
  it('Should get images with default settings', function(done) {
    nixt()
    .stdin('\n')
    .run('get-lock-screen.exe get-images')
    .stdout(/.*Save folder.*/)
    .end(done);
  });

  it('Should get images with additional arguments', function(done) {
    const folderName = Math.floor(Math.random() * Math.floor(10000));
    nixt()
    .stdin('\n')
    .run(`get-lock-screen get-images -p=D:/${folderName} -o=landscape -n=hash`)
    .stdout(/.*Save folder.*/)
    .end(done);
  });
});
