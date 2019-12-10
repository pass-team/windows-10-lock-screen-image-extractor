const app = require('caporal');
const {
  DEFAULT_SAVE_PATH,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
  ORIENTATION_ALL,
} = require('./constants');

const defaultAction = require('./commands/default');

// App construction
app
  .version('1.0.0')
  .description('Extract the mysterious Windows 10 lock screens and save to the folder of your choice')
  .argument('[orientation]', 'Choose image orientation', [ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT, ORIENTATION_ALL], ORIENTATION_ALL)
  .option('-p, --path', '\tPath to saving folder\t', /[A-Z]:.+|false/, DEFAULT_SAVE_PATH, false)
  .action(defaultAction);

app.parse(process.argv);
