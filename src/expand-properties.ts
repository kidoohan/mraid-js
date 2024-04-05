import { Size } from "./size";
import {
  isBoolean,
  isNumber,
  validateBoolean,
  validateNumber,
} from "./validate";
import { BaseProperties } from "./base-properties";
import { ValidateResult } from "./types";

/** Represents the properties for expanding the ad. */
export class ExpandProperties
  extends BaseProperties<ExpandProperties>
  implements Size
{
  /**
   * The width of creative.
   *
   * @defaultValue -1
   */
  width: number;

  /**
   * The height of creative.
   *
   * @defaultValue -1
   */
  height: number;

  /**
   * Whether to use custom close or not.
   *
   * @defaultValue false
   *
   * @deprecated in MRAID 3.0; should still be provided by SDKs for backwards compatibility, but may not be honoured
   */
  useCustomClose: boolean;

  /**
   * Whether the ad container is modal for the expanded ad.
   *
   * @defaultValue true
   * @readonly
   */
  readonly isModal: boolean;

  /**
   *
   * @param width - The width of creative, default is full screen width.
   * @param height - The height of creative, default is full screen height.
   * @param useCustomClose - Whether to use custom close or not.
   * @param isModal - Whether the ad container is modal for the expanded ad.
   */
  constructor(
    width: number,
    height: number,
    useCustomClose: boolean,
    isModal: boolean,
  ) {
    super();
    this.width = width;
    this.height = height;
    this.useCustomClose = useCustomClose;
    this.isModal = isModal;
  }

  override propertiesValidator(): Record<
    string,
    (value: unknown) => ValidateResult
  > {
    return {
      width: (value: unknown) => {
        return validateNumber(value);
      },
      height: (value: unknown) => {
        return validateNumber(value);
      },
      useCustomClose: (value: unknown) => {
        return validateBoolean(value);
      },
      isModal: () => {
        return { passed: true };
      },
    };
  }

  override clone(): ExpandProperties {
    return new ExpandProperties(
      this.width,
      this.height,
      this.useCustomClose,
      this.isModal,
    );
  }

  override update(value: ExpandProperties): void {
    this.validate(value);
    if (isNumber(value.width)) {
      this.width = value.width;
    }
    if (isNumber(value.height)) {
      this.height = value.height;
    }
    if (isBoolean(value.useCustomClose)) {
      this.useCustomClose = value.useCustomClose;
    }
  }
}
