import app from 'caporal';
import Debug from 'debug';
import {
  DEFAULT_SAVE_PATH,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_DATE,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
  ORIENTATION_ALL, ERROR_CODES,
} from './constants';
import {
  getImages,
  showSettings,
  randomDesktop,
  showMenu,
} from './actions';

/**
 *  Define app commands and respectively actions
 *  We are using Caporal.js as cli framework
 *  Checkout their document to better understand syntax
 *  Caporal.js https://github.com/mattallty/Caporal.js
 */

if (!['--debug', '-v', '--verbose'].some((arg) => process.argv.includes(arg))) {
  Debug.disable();
}

app
  .version('1.0.0')
  .description('Extract gorgeous Windows 10 lock screens images and save to the folder of you choose')
  /** @Command: default when no command is provided */
  .action(showMenu)
  /** @Command: get-images */
  .command('get-images', 'Extract lock screen images from windows 10')
  /** @Option path: image saving folder */
  .option('-p, --path', 'Path to save images to',
    (option) => {
      if (new RegExp(/[A-Z]:.+|false/)
        .test(option)) {
        return option;
      }
      throw new Error(` (${ERROR_CODES.ER01})`);
    },
    DEFAULT_SAVE_PATH,
    false)
  .help(`Example:
   get-lock-screen get-images -p D:/images`)
  /** @Option orientation: landscape, portrait, all */
  .option('-o, --orientation',
    'Filter images based on orientation:\n'
    + 'Choose: \n'
    + `  '${ORIENTATION_LANDSCAPE}'\n`
    + `  '${ORIENTATION_PORTRAIT}'\n`
    + `  '${ORIENTATION_ALL}'\n`,
    (option) => {
      if (new RegExp(`${ORIENTATION_LANDSCAPE}|${ORIENTATION_PORTRAIT}|${ORIENTATION_ALL}|false`).test(option)) {
        return option;
      }
      throw new Error(` (${ERROR_CODES.ER01})`);
    }, ORIENTATION_ALL, false)
  .help(`Example:
   get-lock-screen get-images -o landscape`)
  /** @Option name pattern: origin, hash, date */
  .option('-n, --name-pattern',
    'Output filename pattern\n'
    + 'Choose: \n'
    + `  '${IMAGE_NAME_FORMAT_ORIGIN}': Keep name that windows give\n`
    + `  '${IMAGE_NAME_FORMAT_HASH}': Use image hash as name\n`
    + `  '${IMAGE_NAME_FORMAT_DATE}': Use current date as name`, (option) => {
      if (new RegExp(`${IMAGE_NAME_FORMAT_ORIGIN}|${IMAGE_NAME_FORMAT_HASH}|${IMAGE_NAME_FORMAT_DATE}|false`)
        .test(option)) {
        return option;
      }
      throw new Error(` (${ERROR_CODES.ER01})`);
    },
    IMAGE_NAME_FORMAT_ORIGIN,
    false)
  .help(`Example:
   get-lock-screen get-images -n hash`)
  .action(getImages)

  /** @Command: show-settings */
  .command('show-settings', 'Show your current saving folder')
  .help('Example: get-lock-screen show-settings')
  .action(showSettings)

  /** @Command: random-desktop */
  .command('random-desktop', 'Randomly set a new desktop wallpaper')
  .help('Example: get-lock-screen random-desktop')
  .action(randomDesktop);

app.parse(process.argv);
