import { Size } from "./size";
import {
  isBoolean,
  isDefined,
  isIncludes,
  isNumber,
  validateBoolean,
  validateGreaterThanEqualToNumber,
  validateIncludes,
  validateNumber,
} from "./validate";
import { PositionType, ValidateResult } from "./types";
import { BaseProperties } from "./base-properties";
import { CLOSE_POSITION_TYPES } from "./constants";

/** Represents the properties for resizing the ad. */
export class ResizeProperties
  extends BaseProperties<ResizeProperties>
  implements Size
{
  /** The width, in density independent pixels, to which the ad container must be resized. */
  width: number;

  /** The height, density independent pixels, to which the ad container must be resized. */
  height: number;

  /**
   * The horizontal delta from the current upper-left position to the desired
   * resize upper-left position of the ad container.
   *
   * Positive integers move right; negative integers move left.
   */
  offsetX: number;

  /**
   * The vertical delta from the current upper-left position to the desired
   * resize upper-left position of the container.
   *
   * Positive integers move down; negative integers move up.
   */
  offsetY: number;

  /**
   * the host will always add close indicator in top right corner.
   *
   * @deprecated in MRAID 3.0; should still be provided by SDKs for backwards compatibility, but may not be honoured.
   */
  customClosePosition: PositionType;

  /**
   * Whether the resized ad container must be allowed to be drawn partially or
   * fully offscreen.
   */
  allowOffscreen: boolean;

  constructor(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    customClosePosition: PositionType,
    allowOffscreen: boolean,
  ) {
    super();
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.customClosePosition = customClosePosition;
    this.allowOffscreen = allowOffscreen;
  }

  override propertiesValidator(): Record<
    string,
    (value: unknown) => ValidateResult
  > {
    return {
      width: (value: unknown) => {
        return validateGreaterThanEqualToNumber(value, 50);
      },
      height: (value: unknown) => {
        return validateGreaterThanEqualToNumber(value, 50);
      },
      offsetX: (value: unknown) => {
        return validateNumber(value);
      },
      offsetY: (value: unknown) => {
        return validateNumber(value);
      },
      customClosePosition: (value: unknown) => {
        // check
        if (!isDefined(value)) {
          return { passed: true };
        }
        return validateIncludes(CLOSE_POSITION_TYPES, value);
      },
      allowOffscreen: (value) => {
        return validateBoolean(value);
      },
    };
  }

  override clone(): ResizeProperties {
    return new ResizeProperties(
      this.width,
      this.height,
      this.offsetX,
      this.offsetY,
      this.customClosePosition,
      this.allowOffscreen,
    );
  }

  override update(value: ResizeProperties): void {
    this.validate(value);
    if (isNumber(value.width)) {
      this.width = value.width;
    }
    if (isNumber(value.height)) {
      this.height = value.height;
    }
    if (isNumber(value.offsetX)) {
      this.offsetX = value.offsetX;
    }
    if (isNumber(value.offsetY)) {
      this.offsetY = value.offsetY;
    }
    if (isIncludes(CLOSE_POSITION_TYPES, value.customClosePosition)) {
      this.customClosePosition = value.customClosePosition;
    }
    if (isBoolean(value.allowOffscreen)) {
      this.allowOffscreen = value.allowOffscreen;
    }
  }
}
