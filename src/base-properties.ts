import { ValidateResult } from "./types";
import { isObject } from "./validate";

export abstract class BaseProperties<T extends Record<string, any>> {
  abstract propertiesValidator(): Record<
    string,
    (value: unknown) => ValidateResult
  >;

  abstract clone(): T;

  validate(value: T | any): value is T {
    if (!isObject(value)) {
      throw Error("Required object missing.");
    }

    Object.keys(value).forEach((key) => {
      const propertyValidator = this.propertiesValidator()[key];
      if (!propertyValidator) {
        throw Error(`Invalid property specified - '${key}'.`);
      }
      const propertyValidateResult = propertyValidator(value[key]);
      if (!propertyValidateResult.passed) {
        throw Error(
          `Value of property '${key}' is ${propertyValidateResult.message}.`,
        );
      }
    });
    return true;
  }

  abstract update(value: T): void;
}
