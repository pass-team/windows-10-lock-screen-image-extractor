import promptConditionMatch from '../../../source/helpers/prompt-condition-match.js';

describe('Helper - Function prompt-condition-match', () => {
  const oldProcessArgv = process.argv;
  afterEach(() => {
    process.argv = oldProcessArgv;
  });
  it('Should return true when the process has no argument', () => {
    process.argv = ['a', 'b'];

    expect(promptConditionMatch(process)).toBeTruthy();
  });
  it('Should return false when the process has more than one arguments', () => {
    process.argv = ['a', 'b', 'c'];

    expect(promptConditionMatch(process)).toBeFalsy();
  });

  it('Should return true when the process has only one argument: verbose', () => {
    process.argv = ['a', 'b', '-v'];
    expect(promptConditionMatch(process)).toBeTruthy();

    process.argv = ['a', 'b', '--verbose'];
    expect(promptConditionMatch(process)).toBeTruthy();

    process.argv = ['a', 'b', 'get-images', '--verbose'];
    expect(promptConditionMatch(process)).toBeFalsy();

    process.argv = ['a', 'b', 'get-images', '-p', 'D:/', '--verbose'];
    expect(promptConditionMatch(process)).toBeFalsy();

    process.argv = ['a', 'b', '--verbose', 'get-images', '-p', 'D:/'];
    expect(promptConditionMatch(process)).toBeFalsy();

    process.argv = ['a', 'b', '-v'];
    expect(promptConditionMatch(process)).toBeTruthy();

    process.argv = ['a', 'b', 'get-images', '-v'];
    expect(promptConditionMatch(process)).toBeFalsy();

    process.argv = ['a', 'b', 'get-images', '-p', 'D:/', '-v'];
    expect(promptConditionMatch(process)).toBeFalsy();

    process.argv = ['a', 'b', '-v', 'get-images', '-p', 'D:/'];
    expect(promptConditionMatch(process)).toBeFalsy();
  });
});
