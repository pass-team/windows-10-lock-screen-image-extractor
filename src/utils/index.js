module.exports = {
  trimQuotes(pathString) {
    return pathString.replace(/['"]+/g, '');
  },

  standardizePath(path) {
    let standardizePathString = path;
    if (!path.endsWith('\\') && !path.endsWith('/')) {
      standardizePathString += '\\';
    }
    return standardizePathString;
  },
};
