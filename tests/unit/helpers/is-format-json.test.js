import isFormatJson from '../../../source/helpers/is-format-json.js';

describe('Helper - Function isFormatJson', () => {
  it('Should return true if format options is json and false otherwise', () => {
    const oldProcessArgv = process.argv;
    process.argv.push('--format');
    process.argv.push('json');
    expect(isFormatJson()).toEqual(true);

    process.argv = process.argv.slice(0, 2);
    expect(isFormatJson()).toEqual(false);

    process.argv = oldProcessArgv;
  });
});
