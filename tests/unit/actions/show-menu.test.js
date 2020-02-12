import logger from 'caporal/lib/logger';
import Select from 'enquirer/lib/prompts/select';
import {
  MENU_OPTIONS,
} from '../../../source/constants';
import {
  showMenu,
} from '../../../source/actions';
import showSettings from '../../../source/actions/show-settings';
import getImages from '../../../source/actions/get-images';
import randomDesktop from '../../../source/actions/random-desktop';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

jest.mock('caporal/lib/logger');
jest.mock('enquirer/lib/prompts/select');
jest.mock('../../../source/actions/get-images');
jest.mock('../../../source/actions/show-settings');
jest.mock('../../../source/actions/random-desktop');

let infoRecord = '';
let warnRecord = '';
let errorRecord = '';

const mockLogger = logger.createLogger.mockImplementation(() => {
  return {
    info: jest.fn(
      function (data) {
        infoRecord += data;
      }
    ),
    warn: jest.fn(
      function (data) {
        warnRecord += data;
      }
    ),
    error: jest.fn(
      function (data) {
        errorRecord += data;
      }
    )
  }
});

describe('Action show-menu', () => {
  beforeEach(() => {
    infoRecord = '';
    warnRecord = '';
  });
  it('Should call action get-images when choose "1. Get lock screen images"', async () => {
    const logger = mockLogger();
    Select.mockImplementation(() => {
      return {
        run: jest.fn().mockResolvedValue(MENU_OPTIONS.GET_LOCK_SCREEN),
      }
    });

    getImages.mockImplementation(() => '');
    await showMenu(
      {},
      {},
      logger
    );
    expect(getImages).toHaveBeenCalled();
  });

  it('Should call action random-desktop when choose "2. Randomize desktop background"', async () => {
    const logger = mockLogger();
    Select.mockImplementation(() => {
      return {
        run: jest.fn().mockResolvedValue(MENU_OPTIONS.RANDOM_DESKTOP),
      }
    });

    randomDesktop.mockImplementation(() => '');
    await showMenu(
      {},
      {},
      logger
    );
    expect(randomDesktop).toHaveBeenCalled();
  });

  it('Should call action show-settings when choose "3. Show current user settings"', async () => {
    const logger = mockLogger();
    Select.mockImplementation(() => {
      return {
        run: jest.fn().mockResolvedValue(MENU_OPTIONS.CURRENT_SETTINGS),
      }
    });

    showSettings.mockImplementation(() => '');
    await showMenu(
      {},
      {},
      logger
    );
    expect(showSettings).toHaveBeenCalled();
  });
});