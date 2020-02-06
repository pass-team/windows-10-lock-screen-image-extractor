import ora from 'ora';

const executor = function (task, fakeTime) {
  return new Promise((resolve) => setTimeout(() => resolve(task), fakeTime));
};

/**
 *  @Helper
 *  @Input:
 *    - task: the callback/function to execute
 *    - message: text to display to user when executing task
 *    - fakeTime: buffered time if the task running too fast to improve UX
 *  @Output:
 *    - return: task's output
 */
export default async function (task, message, fakeTime) {
  const spinner = ora({
    text: message,
    spinner: 'dots',
    indent: 0,
  });

  spinner.start();
  const output = await executor(task, fakeTime);
  spinner.succeed();
  return output;
};
