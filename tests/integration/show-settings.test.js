import nixt from 'nixt/lib/nixt/runner';
import path from "path";

describe('Feature show-settings', () => {
  const cwd = path.join(process.cwd(), '/build');

  it('Should display path to saving folder', (done) => {
    nixt()
      .cwd(cwd)
      .exec('cd build')
      .stdin('\n')
      .run('get-lock-screen get-images')
      .end(done);

    nixt()
      .cwd(cwd)
      .exec('cd build')
      .stdin('\n')
      .run('get-lock-screen show-settings')
      .stdout(/.*Pictures\\W10_Spotlight\\.*/)
      .end(done);
  });
});
