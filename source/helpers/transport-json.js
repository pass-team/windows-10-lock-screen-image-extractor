import Transport from 'winston-transport';
import stripAnsi from 'strip-ansi';

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
    ora: [],
    verbose: true,
    errors: [],
  };

  log(log, cb) {
    setImmediate(() => {
      this.emit('logged', log);
    });
    if (log.level === 'info' || log.level === 'warn') {
      const sanitizedLog = stripAnsi(log.message);
      this.state.logs.push(sanitizedLog);
    } else if (log.level === 'debug') {
      const sanitizedLog = stripAnsi(log.message);
      this.state.logs.push(sanitizedLog);
    } else if (log.level === 'error') {
      const sanitizedLog = stripAnsi(log.message);
      this.state.errors.push(sanitizedLog);
    }
    console.log(this.state);
    // const sanitizedLog = stripAnsi(log.message);
    // this.state.ora.push(sanitizedLog);
    cb();
  }
}
