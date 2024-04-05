import { ExpandProperties } from "../src/expand-properties";

let expandProperties: ExpandProperties;

describe("ExpandProperties", () => {
  beforeEach(() => {
    expandProperties = new ExpandProperties(-1, -1, false, true);
  });

  describe("clone", () => {
    let clonedExpandProperties: ExpandProperties;

    beforeEach(() => {
      clonedExpandProperties = expandProperties.clone();
    });

    test("should return object with same values", () => {
      expect(clonedExpandProperties.width).toBe(expandProperties.width);
      expect(clonedExpandProperties.height).toBe(expandProperties.height);
      expect(clonedExpandProperties.useCustomClose).toBe(
        expandProperties.useCustomClose,
      );
      expect(clonedExpandProperties.isModal).toBe(expandProperties.isModal);
    });

    test("should return different object", () => {
      expect(expandProperties !== clonedExpandProperties).toBe(true);
    });
  });

  describe("validate", () => {
    it.each([10, true, false, null, undefined])(
      "with %p then should thrown an error",
      (param: any) => {
        expect(() => {
          expandProperties.validate(param);
        }).toThrow("Required object missing.");
      },
    );

    it.each([
      { foo: false },
      { width: 300, bar: {} },
      {
        width: 300,
        height: 250,
        custom: 300,
      },
    ])(
      "with value containing unsupported property then should throw an error",
      (param: any) => {
        expect(() => {
          expandProperties.validate(param);
        }).toThrow("Invalid property specified -");
      },
    );

    ["width", "height"].forEach((key) => {
      it.each([null, undefined, true, "foo", {}, NaN, () => {}])(
        `with non-numeric ${key} value of %p then should throw an error`,
        (param: any) => {
          expect(() => expandProperties.validate({ [key]: param })).toThrow(
            `Value of property '${key}' is not a number.`,
          );
        },
      );
    });

    it.each([null, undefined, 100, "", {}, NaN, () => {}])(
      "with non-boolean useCustomClose then should throw an error",
      (param: any) => {
        expect(() =>
          expandProperties.validate({ useCustomClose: param }),
        ).toThrow(`Value of property 'useCustomClose' is not a boolean type.`);
      },
    );

    it.each([
      {},
      { width: 300 },
      { height: 250, useCustomClose: true },
      { useCustomClose: true },
      { width: 300, height: 250, useCustomClose: true },
    ])("with %p then should return true", (param: any) => {
      expect(expandProperties.validate(param)).toBe(true);
    });
  });
});
