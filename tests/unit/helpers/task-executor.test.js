import chalk from 'chalk';
import taskExecutor from '../../../source/helpers/task-executor.js';
import extendLogger from '../../../source/helpers/extend-logger.js';

const mockLogger = extendLogger();
const infoRecord = [];
mockLogger.info = (data) => {
  infoRecord.push({
    data,
  });
};

describe('Helper - Function task-executor', () => {
  it('Should return task output', async () => {
    const taskOuput = await taskExecutor((() => 2)(), '', 0);
    expect(taskOuput).toEqual(2);
  });

  it('Should pipe executor log to winston a connected winston logger', async () => {
    process.formatJson = 'json';
    await taskExecutor((() => 2)(), 'Piped log 1', 0, mockLogger);
    await taskExecutor((() => 2)(), chalk.red('- Piped log 2'), 0, mockLogger);

    expect(infoRecord[0].data).toEqual('Piped log 1');
    expect(infoRecord[1].data).toEqual('- Piped log 2');
    delete process.formatJson;
  });
});
