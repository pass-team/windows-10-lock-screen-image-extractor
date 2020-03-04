import app from 'caporal';
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
  isFormatJson,
  parseJsonToArgs,
  setDebugMode,
  printJsonOutput,
  TransportJSON,
} from './helpers';

/**
 *  Parse JSON content if provided to setup appropriate logger
 */

// Transfer to using JSON transport when output format is provide: --format
let logger;
// Save format option to global because process.argv is not constant during runtime,
// which may cause inconsistent logging format
process.formatJson = isFormatJson();
if (process.formatJson) logger = extendLogger(new TransportJSON({ level: 'debug' }));
else logger = extendLogger();
// Parse JSON to argv when accept input as JSON: --config
if (!parseJsonToArgs(logger)) {
  // Log for parsing process
  printJsonOutput(logger);
  process.exit(0);
} else {
  // Reinitialize new logger after accepting new process args from JSON
  process.formatJson = isFormatJson();
  if (process.formatJson) logger = extendLogger(new TransportJSON({ level: 'debug' }));
  else logger = extendLogger();
}

// Turn on debug mode for logger if flag verbose is detected
setDebugMode(logger);

/**
 *  Define app commands and respectively actions
 *  We are using Caporal.js as cli framework
 *  Checkout their document to better understand syntax
 *  Caporal.js https://github.com/mattallty/Caporal.js
 */
app
  .version('1.0.0')
  .description('Extract gorgeous Windows 10 lock screens images and save to the folder of you choose')
  .logger(logger)
  .option('--config', 'Provide cli options as JSON string')
  .help(`Example:
   get-lock-screen --config="{"command":"get-images"}"`)
  .option('--config-file', 'Provide cli options as JSON file')
  .help(`Example:
   get-lock-screen --config-file=input.json`)
  .option('--format', 'Define output format. Viable options: "json" or "filename.json"')
  .help(`Example:
   get-lock-screen --format=[text|json]`)
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
  .option('--format', 'Define display format for output')
  .help(`Example:
   get-lock-screen get-images -f [text|json|filename.json]`)
  .action(getImages)

  /** @Command: show-settings */
  .command('show-settings', 'Show your current saving folder')
  .help('Example: get-lock-screen show-settings')
  .option('--format', 'Define display format for output')
  .help(`Example:
   get-lock-screen show-settings --format [text|json]`)
  .action(showSettings)

  /** @Command: random-desktop */
  .command('random-desktop', 'Randomly set a new desktop wallpaper')
  .help('Example: get-lock-screen random-desktop')
  .option('--format', 'Define display format for output')
  .help(`Example:
   get-lock-screen random-desktop --format [text|json|filename.json]`)
  .action(randomDesktop);
app.parse(process.argv);
