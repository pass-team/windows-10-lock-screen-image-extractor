import isImage from '../../../source/helpers/is-image';
import {
  IMAGE_TYPE_JPG,
  IMAGE_TYPE_PNG,
} from '../../../source/constants/index';

describe('Helper - Function is-image', () => {
  it('Should return true if the file is an image', () => {
    expect(isImage({ type: IMAGE_TYPE_JPG })).toEqual(true);

    expect(isImage({ type: IMAGE_TYPE_PNG })).toEqual(true);
  });
  it('Should return false if the file is not an image', () => {
    expect(isImage({ type: 'svg' })).toEqual(false);
  });
});
