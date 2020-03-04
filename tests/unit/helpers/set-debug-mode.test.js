import extendLogger from '../../../source/helpers/extend-logger';
import setDebugMode from '../../../source/helpers/set-debug-mode';
import { TransportJSON } from '../../../source/helpers';

let mockLogger = extendLogger(new TransportJSON());

describe('Helper - Function setDebugMode', () => {
  it('Should toggle logger debug mode based on process.argv', () => {
    const oldProcessArgs = process.argv;

    process.argv = ['', ''];
    setDebugMode(mockLogger);
    expect(mockLogger.transports[0].state.debug).toEqual(false);

    process.argv = ['', '', '-v'];
    setDebugMode(mockLogger);
    expect(mockLogger.transports[0].state.debug).toEqual(true);

    mockLogger = extendLogger(new TransportJSON());
    process.argv = ['', '', '--verbose'];
    setDebugMode(mockLogger);
    expect(mockLogger.transports[0].state.debug).toEqual(true);

    process.argv = oldProcessArgs;
  });
});
