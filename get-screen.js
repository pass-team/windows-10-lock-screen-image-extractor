const os = require('os');
const fs = require('fs');
const sizeOf = require('image-size');
const yargs = require('yargs');
const chalk = require('chalk');

// Contansts
const HOME_DIR = os.homedir();
const PATH_TO_IMAGE = `${HOME_DIR}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`;
const DEFAULT_SAVE_PATH = `${HOME_DIR}\\Pictures\\W10 Spotlight\\`;

function getBulkFileStat(files) {
  const stats = [];
  for (let i = 0; i < files.length; i++) {
    const stat = fs.statSync(PATH_TO_IMAGE + files[i]);
    stats.push({
      name: files[i],
      mtime: stat.mtime,
      size: stat.size,
    });
  }
  return stats;
}

function saveImages(filesToCopy, pathToSave) {
  if (!pathToSave.endsWith('\\') && !pathToSave.endsWith('/')) {
    pathToSave += '\\';
  }
  // Copy file, and track new file count, ignore and return No new image message if no new file
  const count = filesToCopy.reduce((count, file, index) => {
    try {
      fs.copyFileSync(PATH_TO_IMAGE + filesToCopy[index], `${pathToSave + filesToCopy[index]}.jpg`, fs.constants.COPYFILE_EXCL);
      return count + 1;
    } catch (e) {
      if (e.code !== 'EEXIST') console.log(e);
      else return count;
    }
  }, 0);
  if (count === 0) {
    console.log(chalk.red('No new image for you this time!'));
    console.log(chalk.red('Run command with \'--help\' flag to explore all the available options'));
  } else {
    console.log(chalk.green(`\nSuccessfully copy ${count} new images!`));
    console.log(chalk.green('Image Folder: ') + pathToSave);
    console.log(`Run command with ${chalk.green('--help')} flag to explore all the available options`);
  }
}

// Define command arguments
const options = yargs.usage(chalk.blue('\nUsage: --option=value'))
  .option('p', { alias: 'path', describe: 'Path to saved images, create new folder if needed', type: 'string' })
  .option('pt', { alias: 'portrait', describe: 'Only get portrait images', type: 'boolean' })
  .option('la', { alias: 'landscape', describe: 'Only get landscape images', type: 'boolean' })
  .strict(true)
  .showHelpOnFail(false, 'Specify --help for available options')
  .help('help', 'Show supported command options')
  .argv;

function main() {
  const pathToSave = options.path ? options.path : DEFAULT_SAVE_PATH;
  fs.readdir(PATH_TO_IMAGE, (err, files) => {
    // Create new folder to save image if folder not exist
    try {
      fs.mkdirSync(pathToSave);
    } catch (e) {
      if (e.code !== 'EEXIST') {
        console.log(e);
        return;
      }
    }

    // Get all files stats from image source
    const fileStats = getBulkFileStat(files);

    // Filter files that fit criteria
    let filesToCopy = [];
    // Get portrait images option
    if (options.hasOwnProperty('portrait') && !options.hasOwnProperty('landscape')) {
      filesToCopy = fileStats.reduce((filesToCopy, file) => {
        const size = sizeOf(PATH_TO_IMAGE + file.name);
        if (((size.height >= 1366 && size.width >= 768) && size.width < size.height && (size.type === 'jpg' || size.type === 'png'))) {
          filesToCopy.push(file.name);
        }
        return filesToCopy;
      }, []);
    }
    // Get landscape images option
    else if (options.hasOwnProperty('landscape') && !options.hasOwnProperty('portrait')) {
      filesToCopy = fileStats.reduce((filesToCopy, file) => {
        const size = sizeOf(PATH_TO_IMAGE + file.name);
        if (((size.height >= 768 && size.width >= 1366) && size.width > size.height && (size.type === 'jpg' || size.type === 'png'))) {
          filesToCopy.push(file.name);
        }
        return filesToCopy;
      }, []);
    }
    // Get both landscape and portrait images
    else {
      filesToCopy = fileStats.reduce((filesToCopy, file) => {
        const size = sizeOf(PATH_TO_IMAGE + file.name);
        if (((size.height >= 768 && size.width >= 1366) || (size.height >= 1366 && size.width >= 768)) && (size.type === 'jpg' || size.type === 'png')) {
          filesToCopy.push(file.name);
        }
        return filesToCopy;
      }, []);
    }

    // Save images to designated folder
    saveImages(filesToCopy, pathToSave);
  });
}

if (!options.hasOwnProperty('help')) {
  main();
}
