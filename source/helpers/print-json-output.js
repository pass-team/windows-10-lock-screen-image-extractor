import { waitKeyToExit } from './index.js';
import reformatLog from './reformat-log.js';

export default function printJsonOutput(logger) {
  // Print as JSON if asked
  if (process.formatJson) {
    const reformattedLog = reformatLog(logger.transports[0].state);
    // eslint-disable-next-line no-console
    console.log(reformattedLog);
  }
  if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
    waitKeyToExit();
  }
}
