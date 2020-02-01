const { Select } = require('enquirer');

const {
  randomDesktop,
  getImages,
  showSettings,
} = require('../actions');

const { MENU_OPTIONS } = require('../constants');

/* Action that pack the app into one single Windows executable file */
module.exports = async function (args, options, logger) {
  const menuPrompt = new Select({
    name: 'menu',
    message: 'Welcome to Windows 10 lock screen image extractor.\n You want to',
    choices: Object.values(MENU_OPTIONS),
    separator(state) {
      return state.status === 'submitted' ? '...' : '';
    },
    prefix(state) {
      switch (state.status) {
        case 'pending':
          return '';
        case 'cancelled':
          return '';
        case 'submitted':
          return '';
        default:
          return '';
      }
    },
  });

  const choice = await menuPrompt.run();

  switch (choice) {
    case MENU_OPTIONS.GET_LOCK_SCREEN:
      return getImages(args, options, logger);

    case MENU_OPTIONS.RANDOM_DESKTOP:
      return randomDesktop(args, options, logger);

    case MENU_OPTIONS.CURRENT_SETTINGS:
      return showSettings(args, options, logger);

    case MENU_OPTIONS.QUIT:
      return null;

    default:
      return getImages(args, options, logger);
  }
};
