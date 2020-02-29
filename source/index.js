import app from 'caporal';
import winston from 'winston';
import {
  DEFAULT_SAVE_PATH,
  IMAGE_NAME_FORMAT_ORIGIN,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_DATE,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
  ORIENTATION_ALL,
} from './constants';
import {
  getImages,
  showSettings,
  randomDesktop,
  showMenu,
} from './actions';

import {
  extendLogger,
  parseJsonToArgs,
} from './helpers';

import TransportJSON from './helpers/transport-json';
/**
 *  Define app commands and respectively actions
 *  We are using Caporal.js as cli framework
 *  Checkout their document to better understand syntax
 *  Caporal.js https://github.com/mattallty/Caporal.js
 */

if (!parseJsonToArgs()) {
  process.exit(0);
}

let customTransport = new winston.transports.Console();

if (process.argv.includes('json')) {
  customTransport = new TransportJSON({ level: 'debug' });
}

app
  .version('1.0.0')
  .description('Extract gorgeous Windows 10 lock screens images and save to the folder of you choose')
  .logger(extendLogger(customTransport))
  .option('-f, --format', 'Define display format for output')
  .help(`Example:
   get-lock-screen --f [text|json|filename.json]`)
  /** @Command: default when no command is provided */
  .action(showMenu)

  /** @Command: get-images */
  .command('get-images', 'Extract lock screen images from windows 10')
  /** @Option path: image saving folder */
  .option('-p, --path', 'Path to save images to',
    null,
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
    null,
    ORIENTATION_ALL, false)
  .help(`Example:
   get-lock-screen get-images -o landscape`)
  /** @Option name pattern: origin, hash, date */
  .option('-n, --name-pattern',
    'Output filename pattern\n'
    + 'Choose: \n'
    + `  '${IMAGE_NAME_FORMAT_ORIGIN}': Keep name that windows give\n`
    + `  '${IMAGE_NAME_FORMAT_HASH}': Use image hash as name\n`
    + `  '${IMAGE_NAME_FORMAT_DATE}': Use current date as name`,
    null,
    IMAGE_NAME_FORMAT_ORIGIN,
    false)
  .help(`Example:
   get-lock-screen get-images -n hash`)
  .option('-f, --format', 'Define display format for output')
  .help(`Example:
   get-lock-screen get-images -f [text|json|filename.json]`)
  .action(getImages)

  /** @Command: show-settings */
  .command('show-settings', 'Show your current saving folder')
  .help('Example: get-lock-screen show-settings')
  .option('-f, --format', 'Define display format for output')
  .help(`Example:
   get-lock-screen show-settings --f [text|json|filename.json]`)
  .action(showSettings)

  /** @Command: random-desktop */
  .command('random-desktop', 'Randomly set a new desktop wallpaper')
  .help('Example: get-lock-screen random-desktop')
  .option('-f, --format', 'Define display format for output')
  .help(`Example:
   get-lock-screen random-desktop --f [text|json|filename.json]`)
  .action(randomDesktop);

app.parse(process.argv);
