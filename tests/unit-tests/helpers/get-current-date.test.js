const { getCurrentDate } = require('../../../source/helpers');
const mockDateNow = require('./../../mock-data/mock-date-now');

describe('Helper: get-current-date', () => {
  // Cache and reset process.env for each test case
  const processEnvOrigin = { ...process.env };

  afterEach(() => {
    // reset the env variables to initial state
    process.env = processEnvOrigin;
    // reset the modules which were required during the test (if any)
    jest.resetModules();
  });

  it('should return current date in format: "monthName day fullYear"', async () => {
    global.Date.now = mockDateNow();
    expect(getCurrentDate()).toBe('January 16 2020');
  });
});
