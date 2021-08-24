import logger from 'caporal/lib/logger.js';
import Select from 'enquirer/lib/prompts/select.js';
import {
  MENU_OPTIONS,
} from '../../../source/constants/index.js';
import showMenu from '../../../source/actions/show-menu.js';
import showSettings from '../../../source/actions/show-settings.js';
import getImages from '../../../source/actions/get-images.js';
import randomDesktop from '../../../source/actions/random-desktop.js';

jest.mock('caporal/lib/logger.js');
jest.mock('enquirer/lib/prompts/select.js');
jest.mock('../../../source/actions/get-images.js');
jest.mock('../../../source/actions/show-settings.js');
jest.mock('../../../source/actions/random-desktop.js');

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
