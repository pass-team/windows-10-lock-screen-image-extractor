/* eslint consistent-return: off   */
const chalk = require('chalk');
const enquirer = require('enquirer');

const {
  randomDesktop,
  getLockScreenImage,
  packExe,
  showSettings,
} = require('../actions');

const { MENU_OPTIONS } = require('../constants');

/* Action that pack the app into one single Windows executable file */
module.exports = async function (args, options, logger) {
  const menuOptions = [{
    type: 'select',
    name: 'menuOption',
    message: chalk.cyan('Welcome to Windows 10 lock screen image extractor. Pick an option:\n'),
    choices: Object.values(MENU_OPTIONS),
  }];

  const { menuOption } = await enquirer.prompt(menuOptions);

  switch (menuOption) {
    case MENU_OPTIONS.GET_LOCK_SCREEN:
      return getLockScreenImage(args, options, logger);

    case MENU_OPTIONS.RANDOM_DESKTOP:
      return randomDesktop(args, options, logger);

    case MENU_OPTIONS.PACK_EXE:
      return packExe(args, options, logger);

    case MENU_OPTIONS.CURRENT_SETTINGS:
      return showSettings(args, options, logger);

    case MENU_OPTIONS.QUIT:
      return;

    default:
      return getLockScreenImage(args, options, logger);
  }
};
