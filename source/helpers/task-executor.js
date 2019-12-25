const ora = require('ora');

const executor = function (task, fakeTime) {
  return new Promise((resolve) => setTimeout(() => resolve(task), fakeTime));
};

module.exports = async function (task, message, fakeTime) {
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
