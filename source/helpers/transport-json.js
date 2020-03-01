import Transport from 'winston-transport';
import stripAnsi from 'strip-ansi';

export default class TransportJSON extends Transport {
  constructor(opts) {
    super(opts);
  }

  state = {
    status: 'success',
    code: '',
    message: '',
    logs: [],
    ora: [],
    verbose: this.level,
    errors: [],
  };

  log(log, cb) {
    console.log(this.state.verbose);
    setImmediate(() => {
      this.emit('logged', log);
    });
    const sanitizedLog = stripAnsi(log.message.replace('\n', ''));

    if (log.level === 'info' || log.level === 'warn') {
      if (log.isMessage) this.state.message += sanitizedLog;
      else this.state.logs.push(sanitizedLog);
    } else if (log.level === 'debug') {
      this.state.logs.push(sanitizedLog);
    } else if (log.level === 'error') {
      this.state.errors.push(sanitizedLog);
    }
    cb();
  }
}
