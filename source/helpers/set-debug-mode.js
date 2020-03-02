export default function setDebugMode(logger) {
  process.argv.forEach((e) => {
    if (e.startsWith('--verbose') || e.startsWith('-v')) {
      if (logger.transports[0].state) {
        // eslint-disable-next-line no-param-reassign
        logger.transports[0].state.debug = true;
      }
    }
  });
}
