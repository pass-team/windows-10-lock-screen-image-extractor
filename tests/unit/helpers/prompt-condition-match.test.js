const promptConditionMatch = require('../../../source/helpers/prompt-condition-match');

describe('Helper - Function prompt-condition-match', () => {
  const oldProcessArgv = process.argv;
  afterEach(() => {
    process.argv = oldProcessArgv;
  });
  it('Should return true when the process has no argument', () => {
    process.argv = ['a','b'];

    expect(promptConditionMatch(process)).toBeTruthy();
  });
  it('Should return false when the process has more than one arguments', () => {
    process.argv = ['a','b','c'];

    expect(promptConditionMatch(process)).toBeFalsy();
  });
});

