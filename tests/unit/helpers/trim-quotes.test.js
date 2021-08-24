import trimQuotes from '../../../source/helpers/trim-quotes.js';

describe('Helper - Function trim-quotes', () => {
  const string = 'RegExr was created by "gskinner.com"';

  it('Should remove quotes from strings', () => {
    expect(trimQuotes(string)).toEqual('RegExr was created by gskinner.com');
  });
});
