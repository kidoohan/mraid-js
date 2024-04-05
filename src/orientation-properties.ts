import { OrientationType, ValidateResult } from "./types";
import { BaseProperties } from "./base-properties";
import {
  isBoolean,
  isIncludes,
  validateBoolean,
  validateIncludes,
} from "./validate";
import { ORIENTATION_TYPES } from "./constants";

export class OrientationProperties extends BaseProperties<OrientationProperties> {
  /**
   * Whether the container will permit device-based orientation changes.
   */
  allowOrientationChange: boolean;

  /**
   * The specified orientation that a view must open.
   */
  forceOrientation: OrientationType;

  constructor(
    allowOrientationChange: boolean,
    forceOrientation: OrientationType,
  ) {
    super();
    this.allowOrientationChange = allowOrientationChange;
    this.forceOrientation = forceOrientation;
  }

  override propertiesValidator(): Record<
    string,
    (value: unknown) => ValidateResult
  > {
    return {
      allowOrientationChange: (value: unknown) => {
        return validateBoolean(value);
      },
      forceOrientation: (value: unknown) => {
        return validateIncludes(ORIENTATION_TYPES, value);
      },
    };
  }

  override clone(): OrientationProperties {
    return new OrientationProperties(
      this.allowOrientationChange,
      this.forceOrientation,
    );
  }

  override update(value: OrientationProperties) {
    this.validate(value);
    if (isBoolean(value.allowOrientationChange)) {
      this.allowOrientationChange = value.allowOrientationChange;
    }
    if (isIncludes(ORIENTATION_TYPES, value.forceOrientation)) {
      this.forceOrientation = value.forceOrientation;
    }
  }
}
