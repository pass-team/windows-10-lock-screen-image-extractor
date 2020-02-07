var nixt = require('nixt');
describe('Feature show-settings', () => {
  it('Should display path to saving folder', function(done) {
    nixt()
    .stdin('\n')
    .run('get-lock-screen get-images')
    .end(done);

    nixt()
    .stdin('\n')
    .run('get-lock-screen show-settings')
    .stdout(/.*Pictures\\W10_Spotlight\\.*/)
    .end(done);
  });
});