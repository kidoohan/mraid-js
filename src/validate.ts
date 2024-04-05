import { ValidateResult } from "./types";

/**
 * Checks if given the `value` is the `Object`.
 *
 * @param value - the value to check.
 * @returns the `true` if `value` is an object, otherwise `false`.
 */
export const isObject = (value: any): boolean => {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
};

/**
 * Checks if given the `value` is defined.
 *
 * @param value - the value to check.
 * @returns the `true` if `value` is defined, otherwise `false`.
 */
export const isDefined = (value: unknown): boolean => {
  return value !== undefined;
};

/**
 * Checks if given the `value` is the `Function` object.
 *
 * @param value - the value to check.
 * @returns the `true` if `value` is a function, otherwise `false`.
 */
export const isFunction = (value: unknown): boolean => {
  return typeof value === "function";
};

/**
 * Checks if given the `value` is the `number` primitive.
 *
 * @param value - the value to check.
 * @returns the `true` if `value` is a number, otherwise `false`.
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !Number.isNaN(value);
};

/**
 * Ensures that a `value` passed as a parameter to the calling method is
 * strictly greater than or equal to `lowerBoundInclusive`.
 *
 * @param value - the value to check.
 * @param lowerBoundInclusive - the inclusive lower bound.
 */
export const isGreaterThanOrEqualTo = (
  value: unknown,
  lowerBoundInclusive: number,
): value is number => {
  return isNumber(value) && value >= lowerBoundInclusive;
};

/**
 * Checks if given the `value` is the `boolean` primitive.
 *
 * @param value - The value to check.
 * @returns The `true` if `value` is a boolean primitive, otherwise `false`.
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

/**
 * Checks if given the `value` is the `string` primitive.
 *
 * @param value - The value to check.
 * @returns The `true` if `value` is a string primitive, otherwise `false`.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * Checks if given the `value` is in `options`.
 *
 * @param options - The options to inspect.
 * @param value - The value to check.
 * @returns `true` if `value` is found, else `false`.
 */
export const isIncludes = <T extends string>(
  options: Record<string, T>,
  value: unknown,
): value is T => {
  let ret = false;
  if (isString(value)) {
    Object.keys(options).forEach((key) => {
      if (options[key] === value) {
        ret = true;
      }
    });
    return ret;
  }
  return false;
};

export const validateNumber = (
  value: unknown,
  errorMessage: string = "not a number",
): ValidateResult => {
  if (!isNumber(value)) {
    return { passed: false, message: errorMessage };
  }
  return { passed: true };
};

export const validateGreaterThanEqualToNumber = (
  value: unknown,
  lowerBoundInclusive: number,
  errorMessage: string = "too small",
): ValidateResult => {
  if (!isNumber(value)) {
    return { passed: false, message: "not a number" };
  }
  if (!isGreaterThanOrEqualTo(value, lowerBoundInclusive)) {
    return { passed: false, message: errorMessage };
  }
  return { passed: true };
};

export const validateBoolean = (
  value: unknown,
  errorMessage: string = "not a boolean type",
): ValidateResult => {
  if (!isBoolean(value)) {
    return { passed: false, message: errorMessage };
  }
  return { passed: true };
};

export const validateIncludes = <T extends string>(
  options: Record<string, T>,
  value: unknown,
  errorMessage: string = "not a valid option",
): ValidateResult => {
  if (!isIncludes(options, value)) {
    return { passed: false, message: errorMessage };
  }
  return { passed: true };
};
