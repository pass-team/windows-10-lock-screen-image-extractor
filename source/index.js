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
  .argument('[orientation]', 'Choose image orientation', [ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT, ORIENTATION_ALL], ORIENTATION_ALL)
  .argument('[name pattern]',
    'Output filename pattern\n'
    + 'Choose: \n'
    + '\'origin\': Keep name that windows give\n'
    + '\'hash\': Use image hash as name\n'
    + '\'date\': Use current date as name', [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE], IMAGE_NAME_FORMAT_ORIGIN, false)
  .option('-p, --path', '\tPath to save images to', /[A-Z]:.+|false/, DEFAULT_SAVE_PATH, false)
  .action(getLockScreenImage)
  .command('show-settings', 'Show your current saving folder')
  .action(showSettings);

app.parse(process.argv);
