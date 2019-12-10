const app = require('caporal');
const { DEFAULT_SAVE_PATH } = require('./constants');
const defaultAction = require('./commands/default');

// App construction
app
  .version('1.0.0')
  .description('Extract the mysterious Windows 10 lock screens and save to the folder of your choice')
  .argument('[orientation]', 'Choose image orientation', ['portrait', 'landscape', 'all'], 'all')
  .option('-p, --path', '\tPath to saving folder\t', /[A-Z]:.+|false/, DEFAULT_SAVE_PATH, false)
  .action(defaultAction);

app.parse(process.argv);
