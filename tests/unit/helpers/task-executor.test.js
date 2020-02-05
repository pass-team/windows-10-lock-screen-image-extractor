const taskExecutor = require('../../../source/helpers/task-executor');

describe('Helper - Function task-executor', () => {
  it('Should return task output', async () => {
    const taskOuput = await taskExecutor((() => 2)(), '', 0);
    expect(taskOuput).toEqual(2);
  });
});
