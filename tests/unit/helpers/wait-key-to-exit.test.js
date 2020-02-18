/* eslint-disable no-console */
import chalk from 'chalk';
import waitKeyToExit from '../../../source/helpers/wait-key-to-exit';

describe('Helper - Function wait-key-to-exit', () => {
  it('Should display "Press any key to exit.."', () => {
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

  it('Should display "Press any key to exit.." in raw mode', () => {
    // Mock console.log()
    const oldLog = console.log;
    const oldIsTTY = process.stdin.isTTY;
    let logRecord = '';

    console.log = (input) => {
      logRecord += input;
    };
    process.stdin.isTTY = true;

    waitKeyToExit();

    console.log = oldLog;
    process.stdin.isTTY = oldIsTTY;
    expect(logRecord).toEqual(chalk.cyan('\nPress any key to exit..'));
  });
});
