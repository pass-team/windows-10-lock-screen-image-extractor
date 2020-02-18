import logger from 'caporal/lib/logger';
import Select from 'enquirer/lib/prompts/select';
import {
  MENU_OPTIONS,
} from '../../../source/constants';
import showMenu from '../../../source/actions/show-menu';
import showSettings from '../../../source/actions/show-settings';
import getImages from '../../../source/actions/get-images';
import randomDesktop from '../../../source/actions/random-desktop';

jest.mock('caporal/lib/logger');
jest.mock('enquirer/lib/prompts/select');
jest.mock('../../../source/actions/get-images');
jest.mock('../../../source/actions/show-settings');
jest.mock('../../../source/actions/random-desktop');

describe('Action - Function show-menu', () => {
  it('Should call action get-images when no item chosen', async () => {
    getImages.mockImplementation(() => '');
    await showMenu({}, {}, logger);
    expect(getImages).toHaveBeenCalled();
  });
  it('Should call action get-images when choose "1. Get lock screen images"', async () => {
    Select.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue(MENU_OPTIONS.GET_LOCK_SCREEN),
    }));
    getImages.mockImplementation(() => '');
    await showMenu({}, {}, logger);
    expect(getImages).toHaveBeenCalled();
  });

  it('Should call action random-desktop when choose "2. Randomize desktop background"', async () => {
    Select.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue(MENU_OPTIONS.RANDOM_DESKTOP),
    }));

    randomDesktop.mockImplementation(() => '');
    await showMenu({}, {}, logger);
    expect(randomDesktop).toHaveBeenCalled();
  });

  it('Should call action show-settings when choose "3. Show current user settings"', async () => {
    Select.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue(MENU_OPTIONS.CURRENT_SETTINGS),
    }));

    showSettings.mockImplementation(() => '');
    await showMenu({}, {}, logger);
    expect(showSettings).toHaveBeenCalled();
  });

  it('Should call action show-settings when choose "4. Quit"', async () => {
    Select.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue(MENU_OPTIONS.QUIT),
    }));

    expect(await showMenu({}, {}, logger)).toBeNull();
  });
});
