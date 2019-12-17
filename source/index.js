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
} = require('./actions');

// App construction
app
  .version('1.0.0')
  .description('Extract the mysterious Windows 10 lock screens and save to the folder of your choice')
  .argument('[orientation]',
    'Filter images based on orientation:\n'
    + 'Choose: \n'
    + `  '${ORIENTATION_LANDSCAPE}'\n`
    + `  '${ORIENTATION_PORTRAIT}'\n`
    + `  '${ORIENTATION_ALL}'\n`, [ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT, ORIENTATION_ALL], ORIENTATION_ALL)
  .argument('[name pattern]',
    'Output filename pattern\n'
    + 'Choose: \n'
    + `  '${IMAGE_NAME_FORMAT_ORIGIN}': Keep name that windows give\n`
    + `  '${IMAGE_NAME_FORMAT_HASH}': Use image hash as name\n`
    + `  '${IMAGE_NAME_FORMAT_DATE}': Use current date as name`, [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE], IMAGE_NAME_FORMAT_ORIGIN, false)
  .option('-p, --path', '\tPath to save images to', /[A-Z]:.+|false/, DEFAULT_SAVE_PATH, false)
  .help(`Example:
   node get-lock-screen-image.js
   node get-lock-screen-image.js -p=D:/images portrait hash`)
  .action(getLockScreenImage)
  .command('show-settings', 'Show your current saving folder')
  .help('Example: node get-lock-screen-image.js show-settings')
  .action(showSettings);

app.parse(process.argv);
