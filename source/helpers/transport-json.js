import Transport from 'winston-transport';
import stripAnsi from 'strip-ansi';
import { ERROR_CODES } from '../constants';

export default class TransportJSON extends Transport {
  // eslint-disable-next-line no-useless-constructor
  constructor(opts) {
    super(opts);
  }

  state = {
    status: 'success',
    code: '',
    message: '',
    logs: [],
    debugModeLogs: [],
    debug: false,
    errors: [],
  };

  log(log, cb) {
    setImmediate(() => {
      this.emit('logged', log);
    });
    const sanitizedLogMessage = stripAnsi(log.message.replace('\n', ' ').trim());
    switch (true) {
      case log.level === 'info' || log.level === 'warn':
        if (log.isMessage) this.state.message += sanitizedLogMessage;
        else this.state.logs.push(sanitizedLogMessage);
        break;
      case (log.level === 'debug'):
        this.state.debugModeLogs.push(`${log.callerFunction}: ${sanitizedLogMessage} ${log.ms}`);
        break;
      case (log.level === 'error' && log.errorCode !== undefined):
        this.state.status = 'error';
        this.state.code = log.errorCode;
        this.state.errors.push({
          code: log.errorCode,
          field: log.field ? log.field : null,
          message: sanitizedLogMessage,
        });
        break;
      default:
        this.state.code = ERROR_CODES.EXCEPTION_001;
        this.state.status = 'error';
        this.state.errors.push({
          code: ERROR_CODES.EXCEPTION_001,
          field: null,
          message: sanitizedLogMessage,
        });
    }
    // if (log.level === 'info' || log.level === 'warn') {
    //   if (log.isMessage) this.state.message += sanitizedLogMessage;
    //   else this.state.logs.push(sanitizedLogMessage);
    // } else if (log.level === 'debug') {
    //   this.state.debugModeLogs.push(`${log.callerFunction}: ${sanitizedLogMessage} ${log.ms}`);
    // } else if (log.level === 'error' && log.errorCode) {
    //   if (!this.state.status !== 'error') {
    //     this.state.status = 'error';
    //   }
    //   if (!this.state.code) this.state.code = log.errorCode;
    //   this.state.errors.push({
    //     code: log.errorCode,
    //     field: log.field ? log.field : null,
    //     message: sanitizedLogMessage,
    //   });
    // } else {
    //   this.state.code = ERROR_CODES.EXCEPTION_001;
    //   this.state.status = 'error';
    //   this.state.errors.push({
    //     code: ERROR_CODES.EXCEPTION_001,
    //     field: null,
    //     message: sanitizedLogMessage,
    //   });
    // }
    cb();
  }
}
