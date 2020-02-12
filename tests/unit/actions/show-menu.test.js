import logger from 'caporal/lib/logger';
import Select from 'enquirer/lib/prompts/select';
import {
  MENU_OPTIONS,
} from '../../../source/constants';
import {
  showMenu,
} from '../../../source/actions';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

jest.mock('caporal/lib/logger');
jest.mock('enquirer/lib/prompts/select');
jest.mock('../../../source/actions/get-images');

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
  it('Should call action get-images when choose "3. Show current user settings"', async () => {
    const folder = 'D://screen-images';
    const logger = mockLogger();

    Select.mockImplementation(() => {
      return {
        run: jest.fn().mockResolvedValue(MENU_OPTIONS.CURRENT_SETTINGS),
      }
    })
    await showMenu(
      {},
      {},
      logger
    );
    expect(infoRecord.includes('Image saved folder(Ctrl + click to open):')).toBeTruthy();
    expect(infoRecord.includes(`file://${folder}`)).toBeTruthy();
    deleteFolderRecursive(folder);
  });
});