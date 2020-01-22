const app = require('caporal');
const {
  DEFAULT_SAVE_PATH,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_DATE,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
  ORIENTATION_ALL,
} = require('./constants');
const {
  getLockScreenImage,
  showSettings,
  randomDesktop,
  showMenu,
} = require('./actions');

/**
 *  Define app commands and respectively actions
 *  We are using Caporal.js as cli framework
 *  Checkout their document to better understand syntax
 *  Caporal.js https://github.com/mattallty/Caporal.js
 */
app
  .version('1.0.0')
  .description('Extract gorgeous Windows 10 lock screens images and save to the folder of you choose')
  .action(showMenu)
  /** @Command: get-images */
  .command('get-images', 'Extract lock screen images from windows 10')
  /** @Option path: image saving folder */
  .option('-p, --path', 'Path to save images to',
    /[A-Z]:.+|false/,
    DEFAULT_SAVE_PATH,
    false)
  .help(`Example:
   get-lock-screen -p D:/images`)
  /** @Option orientation: landscape, portrait, all */
  .option('-o, --orientation',
    'Filter images based on orientation:\n'
    + 'Choose: \n'
    + `  '${ORIENTATION_LANDSCAPE}'\n`
    + `  '${ORIENTATION_PORTRAIT}'\n`
    + `  '${ORIENTATION_ALL}'\n`,
    new RegExp(`${ORIENTATION_LANDSCAPE}|${ORIENTATION_PORTRAIT}|${ORIENTATION_ALL}|false`), ORIENTATION_ALL, false)
  .help(`Example:
   get-lock-screen -o landscape`)
  /** @Option name pattern: origin, hash, date */
  .option('-n, --name-pattern',
    'Output filename pattern\n'
    + 'Choose: \n'
    + `  '${IMAGE_NAME_FORMAT_ORIGIN}': Keep name that windows give\n`
    + `  '${IMAGE_NAME_FORMAT_HASH}': Use image hash as name\n`
    + `  '${IMAGE_NAME_FORMAT_DATE}': Use current date as name`,
    new RegExp(`${IMAGE_NAME_FORMAT_ORIGIN}|${IMAGE_NAME_FORMAT_HASH}|${IMAGE_NAME_FORMAT_DATE}|false`),
    IMAGE_NAME_FORMAT_ORIGIN,
    false)
  .help(`Example:
   get-lock-screen -n hash`)
  .action(getLockScreenImage)

  /** @Command: show-settings */
  .command('show-settings', 'Show your current saving folder')
  .help('Example: get-lock-screen show-settings')
  .action(showSettings)

  /** @Command: random-desktop */
  .command('random-desktop', 'Randomly set a new desktop wallpaper')
  .help('Example: get-lock-screen random-desktop')
  .action(randomDesktop);

app.parse(process.argv);
