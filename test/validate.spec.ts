import { isBoolean, isIncludes } from "../src/validate";
import {
  FEATURE_TYPES,
  ORIENTATION_TYPES,
  PLACEMENT_TYPES,
  CLOSE_POSITION_TYPES,
  STATES,
} from "../src/constants";

describe("Validate", () => {
  describe("isBoolean", () => {
    it.each([
      true,
      false,
      Boolean(true),
      Boolean(false),
      Boolean("true"),
      Boolean("false"),
      Boolean(1),
      Boolean(-1),
    ])("with %p should return true", (param: any) => {
      expect(isBoolean(param)).toBe(true);
    });

    it.each([null, undefined, NaN, Infinity, 1, {}, () => {}])(
      "with %p should return true",
      (param: any) => {
        expect(isBoolean(param)).toBe(false);
      },
    );
  });

  const availableEnums = new Map<string, Record<string, any>>([
    ["FeatureType", FEATURE_TYPES],
    ["OrientationType", ORIENTATION_TYPES],
    ["PlacementType", PLACEMENT_TYPES],
    ["PositionType", CLOSE_POSITION_TYPES],
    ["State", STATES],
  ]);

  describe("isIncludes", () => {
    describe.each([
      FEATURE_TYPES.SMS,
      FEATURE_TYPES.TEL,
      FEATURE_TYPES.CALENDAR,
      FEATURE_TYPES.STORE_PICTURE,
      FEATURE_TYPES.INLINE_VIDEO,
      FEATURE_TYPES.VPAID,
      FEATURE_TYPES.LOCATION,
    ])("given the %p", (param: any) => {
      availableEnums.forEach((value, key) => {
        const isValidEnum = key === "FeatureType";
        test(`${param} is${isValidEnum ? "" : " not"} in ${key}`, () => {
          expect(isIncludes(value, param)).toBe(isValidEnum);
        });
      });
    });

    describe.each([
      ORIENTATION_TYPES.PORTRAIT,
      ORIENTATION_TYPES.LANDSCAPE,
      ORIENTATION_TYPES.NONE,
    ])("given the %p", (param: any) => {
      availableEnums.forEach((value, key) => {
        const isValidEnum = key === "OrientationType";
        test(`${param} is${isValidEnum ? "" : " not"} in ${key}`, () => {
          expect(isIncludes(value, param)).toBe(isValidEnum);
        });
      });
    });

    describe.each([
      PLACEMENT_TYPES.UNKNOWN,
      PLACEMENT_TYPES.INLINE,
      PLACEMENT_TYPES.INTERSTITIAL,
    ])("given the %p", (param: any) => {
      availableEnums.forEach((value, key) => {
        const isValidEnum = key === "PlacementType";
        test(`${param} is${isValidEnum ? "" : " not"} in ${key}`, () => {
          expect(isIncludes(value, param)).toBe(isValidEnum);
        });
      });
    });

    describe.each([
      CLOSE_POSITION_TYPES.TOP_LEFT,
      CLOSE_POSITION_TYPES.TOP_RIGHT,
      CLOSE_POSITION_TYPES.TOP_CENTER,
      CLOSE_POSITION_TYPES.CENTER,
      CLOSE_POSITION_TYPES.BOTTOM_LEFT,
      CLOSE_POSITION_TYPES.BOTTOM_RIGHT,
      CLOSE_POSITION_TYPES.BOTTOM_CENTER,
    ])("given the %p", (param: any) => {
      availableEnums.forEach((value, key) => {
        const isValidEnum = key === "PositionType";
        test(`${param} is${isValidEnum ? "" : " not"} in ${key}`, () => {
          expect(isIncludes(value, param)).toBe(isValidEnum);
        });
      });
    });

    describe.each([
      STATES.LOADING,
      STATES.DEFAULT,
      STATES.EXPANDED,
      STATES.HIDDEN,
      STATES.RESIZED,
    ])("given the %p", (param: any) => {
      availableEnums.forEach((value, key) => {
        const isValidEnum = key === "State";
        test(`${param} is${isValidEnum ? "" : " not"} in ${key}`, () => {
          expect(isIncludes(value, param)).toBe(isValidEnum);
        });
      });
    });

    describe.each(["foo", null, undefined, 100, {}, () => {}])(
      "given the %p as invalid value",
      (param: any) => {
        availableEnums.forEach((value, key) => {
          test(`${param} is not in ${key}`, () => {
            expect(isIncludes(value, param)).toBe(false);
          });
        });
      },
    );
  });
});
