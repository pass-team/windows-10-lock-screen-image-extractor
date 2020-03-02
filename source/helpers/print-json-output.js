import fs from 'fs';
import yargs from 'yargs';
import { isOutputFormatProvided, waitKeyToExit } from './index';
import reformatLog from './reformat-log';

export default function printJsonOutput(logger) {
  if (isOutputFormatProvided()) {
    const reformattedLog = reformatLog(logger.transports[0].state);
    if (yargs.argv.output.endsWith('.json')) {
      fs.writeFileSync(yargs.argv.output, JSON.stringify(reformattedLog, null, 2), 'utf-8');
    } else {
      // eslint-disable-next-line no-console
      console.log(reformattedLog);
    }
  }
  if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
    waitKeyToExit();
  }
}
