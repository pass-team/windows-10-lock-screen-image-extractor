const enquirer = require('enquirer');
const {
  ORIENTATION_PORTRAIT,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_ALL,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
  DEFAULT_SAVE_PATH,
} = require('../constants');

module.exports = async function () {
  const requestForPromptQuestion = [
    {
      type: 'select',
      name: 'confirmation',
      message: 'We will ask you some questions to personalize, leave a \'No\' if you feel lazy ^^:',
      choices: ['Yes', 'No'],
    },
  ];

  const argumentPromptQuestions = [
    {
      type: 'select',
      name: 'orientation',
      message: `Choose image orientation (${ORIENTATION_ALL}): `,
      choices: [ORIENTATION_ALL, ORIENTATION_PORTRAIT, ORIENTATION_LANDSCAPE],
    },
    {
      type: 'select',
      name: 'namePattern',
      message: `What name pattern do you want to save images as? (${IMAGE_NAME_FORMAT_ORIGIN})`,
      choices: [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE],
    },
    { type: 'input', name: 'path', message: `Specify a folder for your images (${DEFAULT_SAVE_PATH}): ` },
  ];

  const { confirmation } = await enquirer.prompt(requestForPromptQuestion);
  if (confirmation === 'No') {
    return {};
  }
  const answer = await enquirer.prompt(argumentPromptQuestions);
  return answer;
};
