import logger from 'caporal/lib/logger';
import extendedLogger from '../../../source/helpers/extended-logger';

describe('Helper - Function extend-debug-logger', () => {
  const mockLogger = logger.createLogger();

  it('Should create a logger object with debug function', () => {
    const customLogger = extendedLogger(mockLogger);
    expect(customLogger.verbose).toBeDefined();
    expect(typeof customLogger.verbose).toEqual('function');
    expect(customLogger.debug).toBeDefined();
    expect(typeof customLogger.debug).toEqual('function');
  });
});
