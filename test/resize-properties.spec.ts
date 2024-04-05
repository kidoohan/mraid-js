import { ResizeProperties } from "../src/resize-properties";
import { CLOSE_POSITION_TYPES } from "../src/constants";

let resizeProperties: ResizeProperties;

describe("ResizeProperties", () => {
  beforeEach(() => {
    resizeProperties = new ResizeProperties(
      320,
      50,
      100,
      200,
      CLOSE_POSITION_TYPES.TOP_RIGHT,
      true,
    );
  });

  describe("clone", () => {
    let clonedResizeProperties: ResizeProperties;

    beforeEach(() => {
      clonedResizeProperties = resizeProperties.clone();
    });

    test("should return object with same values", () => {
      expect(clonedResizeProperties.width).toBe(resizeProperties.width);
      expect(clonedResizeProperties.height).toBe(resizeProperties.height);
      expect(clonedResizeProperties.offsetX).toBe(resizeProperties.offsetX);
      expect(clonedResizeProperties.offsetY).toBe(resizeProperties.offsetY);
      expect(clonedResizeProperties.customClosePosition).toBe(
        resizeProperties.customClosePosition,
      );
      expect(clonedResizeProperties.allowOffscreen).toBe(
        resizeProperties.allowOffscreen,
      );
    });

    test("should return different object", () => {
      expect(resizeProperties !== clonedResizeProperties).toBe(true);
    });
  });

  describe("validate", () => {
    it.each([10, true, false, null, undefined])(
      "with %p then should thrown an error",
      (param: any) => {
        expect(() => {
          resizeProperties.validate(param);
        }).toThrow("Required object missing.");
      },
    );

    it.each([
      { foo: false },
      { width: 300, bar: {} },
      {
        width: 300,
        height: 250,
        offsetX: 300,
        offsetY: 250,
        customClosePosition: CLOSE_POSITION_TYPES.BOTTOM_CENTER,
        allowOffscreen: true,
        custom: 300,
      },
    ])(
      "with value containing unsupported property then should throw an error",
      (param: any) => {
        expect(() => {
          resizeProperties.validate(param);
        }).toThrow("Invalid property specified -");
      },
    );

    ["width", "height", "offsetX", "offsetY"].forEach((key) => {
      it.each([null, undefined, true, "foo", {}, NaN, () => {}])(
        `with non-numeric ${key} value of %p then should throw an error`,
        (param: any) => {
          expect(() => resizeProperties.validate({ [key]: param })).toThrow(
            `Value of property '${key}' is not a number.`,
          );
        },
      );
    });

    ["width", "height"].forEach((key) => {
      it.each([-100, 0, 49.999999])(
        `with small ${key} value of %p then should throw an error`,
        (param: any) => {
          expect(() => resizeProperties.validate({ [key]: param })).toThrow(
            `Value of property '${key}' is too small.`,
          );
        },
      );
    });

    it.each([null, 100, "bottom", {}, NaN, () => {}])(
      `with invalid customClosePosition value of %p then should throw an error`,
      (param: any) => {
        expect(() =>
          resizeProperties.validate({ customClosePosition: param }),
        ).toThrow(
          `Value of property 'customClosePosition' is not a valid option.`,
        );
      },
    );

    it.each([null, undefined, 100, "", {}, NaN, () => {}])(
      `with non-boolean allowOffscreen value of %p then should throw an error`,
      (param: any) => {
        expect(() =>
          resizeProperties.validate({ allowOffscreen: param }),
        ).toThrow(`Value of property 'allowOffscreen' is not a boolean type.`);
      },
    );

    it.each([
      {},
      { width: 300 },
      { width: 300, height: 250, customClosePosition: undefined },
      {
        width: 300,
        height: 250,
        offsetX: 300,
        offsetY: 250,
        customClosePosition: CLOSE_POSITION_TYPES.BOTTOM_CENTER,
      },
      {
        width: 300,
        height: 250,
        offsetX: 300,
        offsetY: 250,
        customClosePosition: CLOSE_POSITION_TYPES.BOTTOM_CENTER,
        allowOffscreen: true,
      },
    ])("with %p then should return true", (param: any) => {
      expect(resizeProperties.validate(param)).toBe(true);
    });
  });
});
