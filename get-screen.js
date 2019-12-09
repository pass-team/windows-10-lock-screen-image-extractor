const os = require('os');
const fs = require('fs');
const sizeOf = require('image-size');

// Contansts
const HOME_DIR = os.homedir();
const PATH_TO_IMAGE = `${HOME_DIR}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`;
const DEFAULT_SAVE_PATH = `${HOME_DIR}\\Pictures\\W10 Spotlight\\`;

// Ultilities
function trimQuotes(pathString) {
  return pathString.replace(/['"]+/g, '');
}

function standardizePath(path) {
  let standardizePathString = path;
  if (!path.endsWith('\\') && !path.endsWith('/')) {
    standardizePathString += '\\';
  }
  return standardizePathString;
}

// Helpers
function retrieveFilesName(folder) {
  return fs.readdirSync(folder);
}

function getBulkFileStat(files) {
  const stats = [];
  for (let i = 0; i < files.length; i += 1) {
    const stat = fs.statSync(PATH_TO_IMAGE + files[i]);
    stats.push({
      name: files[i],
      mtime: stat.mtime,
      size: stat.size,
    });
  }
  return stats;
}

function filterFilesToCopy(fileStats, constraint) {
  const { orientation } = constraint;
  let filesToCopy = [];
  switch (orientation) {
    case 'portrait':
      filesToCopy = fileStats.reduce((listFilesToCopy, file) => {
        const size = sizeOf(PATH_TO_IMAGE + file.name);
        if (((size.height >= 1366 && size.width >= 768) && size.width < size.height && (size.type === 'jpg' || size.type === 'png'))) {
          listFilesToCopy.push(file.name);
        }
        return listFilesToCopy;
      }, []);
      break;

    case 'landscape':
      filesToCopy = fileStats.reduce((listFilesToCopy, file) => {
        const size = sizeOf(PATH_TO_IMAGE + file.name);
        if (((size.height >= 768 && size.width >= 1366) && size.width > size.height && (size.type === 'jpg' || size.type === 'png'))) {
          listFilesToCopy.push(file.name);
        }
        return listFilesToCopy;
      }, []);
      break;

    default:
      filesToCopy = fileStats.reduce((listFilesToCopy, file) => {
        const size = sizeOf(PATH_TO_IMAGE + file.name);
        if (((size.height >= 768 && size.width >= 1366) || (size.height >= 1366 && size.width >= 768)) && (size.type === 'jpg' || size.type === 'png')) {
          listFilesToCopy.push(file.name);
        }
        return listFilesToCopy;
      }, []);
  }
  return filesToCopy;
}

function copyImages(filesToCopy, pathToSave) {
  const savingPath = standardizePath(pathToSave);
  // Save image and return count on saved files
  return filesToCopy.reduce((count, file, index) => {
    try {
      fs.copyFileSync(PATH_TO_IMAGE + filesToCopy[index], `${savingPath + filesToCopy[index]}.jpg`, fs.constants.COPYFILE_EXCL);
      return count + 1;
    } catch (e) {
      if (e.code !== 'EEXIST') console.log(e);
      else return count;
    }
    return count;
  }, 0);
}

function createSavingFolder(pathToSave) {
  try {
    fs.mkdirSync(pathToSave);
  } catch (e) {
    if (e.code !== 'EEXIST') return false;
  }
  return true;
}

const app = require('caporal');

app
  .version('1.0.0')
  .description('Extract the mysterious Windows 10 lock screens and save to the folder of your choice')
  .argument('[orientation]', 'Choose image orientation', ['portrait', 'landscape', 'all'], 'all')
  .option('-p, --path', '\tPath to saving folder\t', /[A-Z]:.+|false/, DEFAULT_SAVE_PATH, false)
  .action((args, options, logger) => {
    const pathToSave = trimQuotes(options.path ? options.path : DEFAULT_SAVE_PATH);
    const orientation = trimQuotes(args.orientation ? args.orientation : 'all');

    // Main logic
    const files = retrieveFilesName(PATH_TO_IMAGE);
    const fileStats = getBulkFileStat(files);
    const filesToCopy = filterFilesToCopy(fileStats, { orientation });
    if (!createSavingFolder(pathToSave)) {
      logger.error('\nError while create saving folder! Please try again!');
      return;
    }
    const count = copyImages(filesToCopy, pathToSave);

    // Announcement
    if (count) {
      logger.info(`\nSuccessfully copy ${count} new images!`);
      logger.info(`Check out now: ${pathToSave}`);
    } else logger.warn('\nI found no NEW images :) Better luck next time!');
  });

app.parse(process.argv);
