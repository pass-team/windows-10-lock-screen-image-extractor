const { Select, Input } = require('enquirer');

const {
  ORIENTATION_PORTRAIT,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_ALL,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
  DEFAULT_SAVE_PATH,

} = require('../constants');

/**
 *  @Helper
 *  @Input: No
 *  @Output: User answers that customize action: get-lock-screen-image
 */
module.exports = async function () {
  const requestForPrompt = new Select({
    name: 'menu',
    message: 'We will ask you some questions to personalize, are you willing?:',
    choices: ['Yes', 'No'],
    separator(state) {
      return state.status === 'submitted' ? '' : '';
    },
    prefix(state) {
      switch (state.status) {
        case 'pending':
          return '?';
        case 'cancelled':
          return '?';
        case 'submitted':
          return '?';
        default:
          return '?';
      }
    },
  });

  /**
   *  First, ask if they want to answer or not
   */
  const confirmation = await requestForPrompt.run();
  if (confirmation === 'No') {
    return {};
  }

  /**
   *  Then, ask configuration questions
   */
  const answers = {};
  answers.orientation = await new Select({
    name: 'orientation',
    message: 'Which image orientation do you prefer?',
    choices: [ORIENTATION_ALL, ORIENTATION_PORTRAIT, ORIENTATION_LANDSCAPE],
    separator(state) {
      return state.status === 'submitted' ? '' : '';
    },
    prefix(state) {
      switch (state.status) {
        case 'pending':
          return '?';
        case 'cancelled':
          return '?';
        case 'submitted':
          return '?';
        default:
          return '';
      }
    },
  }).run();

  answers.namePattern = await new Select({
    name: 'name pattern',
    message: 'What name pattern to save images as?',
    choices: [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE],
    separator(state) {
      return state.status === 'submitted' ? '' : '';
    },
    prefix(state) {
      switch (state.status) {
        case 'pending':
          return '?';
        case 'cancelled':
          return '?';
        case 'submitted':
          return '?';
        default:
          return '';
      }
    },
  }).run();

  answers.path = await new Input({
    message: 'Where to save your images?',
    hint: `(default: ${DEFAULT_SAVE_PATH})`,
    choices: [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE],
    separator(state) {
      return state.status === 'submitted' ? '' : '';
    },
  }).run();

  return answers;
};
