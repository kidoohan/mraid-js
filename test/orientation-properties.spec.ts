import { OrientationProperties } from "../src/orientation-properties";
import { ORIENTATION_TYPES } from "../src/constants";

let orientationProperties: OrientationProperties;

describe("OrientationProperties", () => {
  beforeEach(() => {
    orientationProperties = new OrientationProperties(
      false,
      ORIENTATION_TYPES.NONE,
    );
  });

  describe("clone", () => {
    let clonedOrientationProperties: OrientationProperties;

    beforeEach(() => {
      clonedOrientationProperties = orientationProperties.clone();
    });

    test("should return object with same values", () => {
      expect(clonedOrientationProperties.allowOrientationChange).toBe(
        orientationProperties.allowOrientationChange,
      );
      expect(clonedOrientationProperties.forceOrientation).toBe(
        orientationProperties.forceOrientation,
      );
    });

    test("should return different object", () => {
      expect(orientationProperties !== clonedOrientationProperties).toBe(true);
    });
  });

  describe("validate", () => {
    it.each([null, undefined, 100, "foo"])(
      "with %p then should throw an error",
      (param: any) => {
        expect(() => {
          orientationProperties.validate(param);
        }).toThrow("Required object missing.");
      },
    );

    test("should throw when invalid property is detected", () => {
      expect(() => {
        orientationProperties.validate({
          allowOrientationChange: false,
          forceOrientation: ORIENTATION_TYPES.NONE,
          foo: false,
        });
      }).toThrow("Invalid property specified - 'foo'");
    });

    test("should throw when allowOrientationChange property is invalid type", () => {
      expect(() => {
        orientationProperties.validate({
          allowOrientationChange: 100,
          forceOrientation: ORIENTATION_TYPES.NONE,
        });
      }).toThrow(
        "Value of property 'allowOrientationChange' is not a boolean type.",
      );
    });

    test("should throw when forceOrientation property is invalid option", () => {
      expect(() => {
        orientationProperties.validate({
          allowOrientationChange: true,
          forceOrientation: null,
        });
      }).toThrow("Value of property 'forceOrientation' is not a valid option.");
    });
  });
});
