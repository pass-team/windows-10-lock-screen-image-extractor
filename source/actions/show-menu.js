const chalk = require('chalk');
const enquirer = require('enquirer');

const {
  randomDesktop,
  getImages,
  showSettings,
} = require('../actions');

const { MENU_OPTIONS } = require('../constants');

/* Action that pack the app into one single Windows executable file */
module.exports = async function (args, options, logger) {
  const menuOptions = [{
    type: 'select',
    name: 'menuOption',
    message: chalk.red('Windows 10 lock screen image extractor.\n  Pick an option:'),
    choices: Object.values(MENU_OPTIONS),
  }];

  const { menuOption } = await enquirer.prompt(menuOptions);

  switch (menuOption) {
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
