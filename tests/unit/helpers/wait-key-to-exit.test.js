import waitKeyToExit from '../../../source/helpers/wait-key-to-exit';
import chalk from 'chalk';

describe('Helper - Function wait-key-to-exit', () => {

  it('Should display "Enter key to exit"', () => {
    // Mock console.log()
    const oldLog = console.log;
    let logRecord = '';
    console.log = (input) => {
      logRecord += input;
    };
    waitKeyToExit();
    console.log = oldLog;
    expect(logRecord).toEqual(chalk.cyan('\nPress any key to exit..'));
  });
});
