const { isValidSizeImage } = require('../../../source/helpers');

describe("Helper: is valid size image", () => {
  it("should render helper", () => {
    expect(isValidSizeImage({
      width: 1366,
      height: 768
    })).toEqual(true);
  });
});
