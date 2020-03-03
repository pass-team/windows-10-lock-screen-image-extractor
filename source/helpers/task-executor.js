import ora from 'ora';
import { Writable } from 'stream';
import stripAnsi from 'strip-ansi';
import { isFormatProvided } from './index';

const executor = function (task, fakeTime) {
  return new Promise((resolve) => setTimeout(() => resolve(task), fakeTime));
};

const writeStreamPipedToLogger = (logger) => new Writable({
  write(chunk, encoding, callback) {
    const message = stripAnsi(chunk.toString());
    if (message.startsWith('-')) {
      logger.info(message.replace('-', '').trim());
    }
    callback();
  },
});
/**
 *  @Helper
 *  @Input:
 *    - task: the callback/function to execute
 *    - message: text to display to user when executing task
 *    - fakeTime: buffered time if the task running too fast to improve UX
 *  @Output:
 *    - return: task's output
 */
export default async function (task, message, fakeTime, logger) {
  const spinner = ora({
    text: message,
    spinner: 'dots',
    indent: 0,
    stream: (isFormatProvided() ? writeStreamPipedToLogger(logger) : process.stderr),
  });

  spinner.start();
  const output = await executor(task, fakeTime);
  spinner.succeed();
  return output;
}
