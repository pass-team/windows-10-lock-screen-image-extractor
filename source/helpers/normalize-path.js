module.exports = function (path) {
  let output = path;
  if (!path.endsWith('\\') && !path.endsWith('/')) {
    output += '\\';
  }
  return output;
};
