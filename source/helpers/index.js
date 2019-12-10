const fs = require('fs');
const sizeOf = require('image-size');
const { standardizePath } = require('../utils');
const { isLandscapeImage, isPortraitImage, isValidImage } = require('./image-validator');
const {
  PATH_TO_IMAGE,
} = require('../constants');

module.exports = {
  retrieveFilesName(folder) {
    return fs.readdirSync(folder);
  },

  getBulkFileStat(files) {
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
  },

  filterFilesToCopy(fileStats, constraint) {
    const { orientation } = constraint;
    let filesToCopy = [];
    switch (orientation) {
      case 'portrait':
        filesToCopy = fileStats.reduce((listFilesToCopy, file) => {
          const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
          if (isPortraitImage(height, width, type)) {
            listFilesToCopy.push(file.name);
          }
          return listFilesToCopy;
        }, []);
        break;

      case 'landscape':
        filesToCopy = fileStats.reduce((listFilesToCopy, file) => {
          const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
          if (isLandscapeImage(height, width, type)) {
            listFilesToCopy.push(file.name);
          }
          return listFilesToCopy;
        }, []);
        break;

      default:
        filesToCopy = fileStats.reduce((listFilesToCopy, file) => {
          const { height, width, type } = sizeOf(PATH_TO_IMAGE + file.name);
          if (isValidImage(height, width, type)) {
            listFilesToCopy.push(file.name);
          }
          return listFilesToCopy;
        }, []);
    }
    return filesToCopy;
  },

  copyImages(filesToCopy, pathToSave) {
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
  },

  createSavingFolder(pathToSave) {
    try {
      fs.mkdirSync(pathToSave);
    } catch (e) {
      if (e.code !== 'EEXIST') return false;
    }
    return true;
  },
};
