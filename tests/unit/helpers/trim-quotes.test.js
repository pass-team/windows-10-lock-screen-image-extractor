const trimQuotes = require('../../../source/helpers/trim-quotes');

describe('Helper - Function trim-quotes', () => {
  const string = 'RegExr was created by "gskinner.com"';

  it('Should remove quotes from strings', () => {
    expect(trimQuotes(string)).toEqual('RegExr was created by gskinner.com');
  });
});
