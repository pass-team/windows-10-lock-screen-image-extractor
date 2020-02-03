var nixt = require('nixt');

describe('Should get images with', () => {
  it('default settings', function(done) {
    nixt()
    .stdin('\n')
    .run('get-lock-screen get-images')
    .stdout(/.*Save folder.*/)
    .end(done);
  });

  it('additional arguments', function(done) {
    const folderName = Math.floor(Math.random() * Math.floor(10000));
    nixt()
    .stdin('\n')
    .run(`get-lock-screen get-images -p=D:/${folderName} -o=landscape -n=hash`)
    .stdout(/.*Save folder.*/)
    .end(done);
  });
});