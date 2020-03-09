import stripAnsi from 'strip-ansi';
import parseConfig from '../../../source/helpers/parse-config';
import extendLogger from '../../../source/helpers/extend-logger';
import { ERROR_CODES } from '../../../source/constants';

let infoRecord = [];
let warnRecord = [];
let errorRecord = [];

const mockLogger = extendLogger();
mockLogger.info = (data, meta) => {
  infoRecord.push({
    data,
    meta,
  });
};
mockLogger.warn = (data, meta) => {
  warnRecord.push({
    data,
    meta,
  });
};
mockLogger.error = (data, meta) => {
  errorRecord.push({
    data,
    meta,
  });
};

mockLogger.log = jest.fn();
describe('Helper - Function parseConfig', () => {
  // Reset logging recorder
  beforeEach(() => {
    infoRecord = [];
    warnRecord = [];
    errorRecord = [];
  });

  it('Should return config object when parse config successfully', () => {
    const config = '{"command":"get-images",'
      + '"options":{"path":"D:/zxczxc","namePattern":"hash","orientation":"landscape"}}';
    const expectedConfig = {
      command: 'get-images',
      options: {
        path: 'D:/zxczxc',
        namePattern: 'hash',
        orientation: 'landscape',
      },
    };
    expect(parseConfig(config, mockLogger)).toEqual(expectedConfig);
  });

  it('Should print out error if fail to parse JSON content', () => {
    const config = '{"command":"get-images",'
      + '"options":{"path":"D:/zxczxc","namePattern":"hash","orientation":"landscape}}';
    expect(parseConfig(config, mockLogger)).toBeNull();
    expect(stripAnsi(errorRecord[0].data))
      .toEqual(expect.stringContaining('Invalid JSON content for option --config.'));
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('config');
  });
});
