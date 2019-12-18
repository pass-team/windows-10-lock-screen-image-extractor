module.exports = function (process) {
  return process.argv.splice(2).length <= 0;
};
