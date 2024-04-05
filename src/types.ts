import {
  FEATURE_TYPES,
  LOG_LEVELS,
  ORIENTATION_TYPES,
  PLACEMENT_TYPES,
  CLOSE_POSITION_TYPES,
  STATES,
} from "./constants";

/** Log level for {@link Logger | logger}. One of `debug`, `info`, `warning`, `error`. */
export type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];

/** Represents the feature. */
export type FeatureType = (typeof FEATURE_TYPES)[keyof typeof FEATURE_TYPES];

/** Represents the orientation. */
export type OrientationType =
  (typeof ORIENTATION_TYPES)[keyof typeof ORIENTATION_TYPES];

/** Represents the confirmation of either an inline or interstitial placement. */
export type PlacementType =
  (typeof PLACEMENT_TYPES)[keyof typeof PLACEMENT_TYPES];

/**
 * Represents the origin of the container-supplied close event region
 * relative to the resized creative.
 */
export type PositionType =
  (typeof CLOSE_POSITION_TYPES)[keyof typeof CLOSE_POSITION_TYPES];

/** Represents the state of the ad. */
export type State = (typeof STATES)[keyof typeof STATES];

/** Represents the orientation of the app. */
export type AppOrientation = {
  /**
   * The value may be either `portrait` or `landscape`.
   *
   * @remarks
   * See the {@link OrientationType| OrientationType} enum for more details.
   */
  orientation: OrientationType;

  /**
   * Whether the orientation is locked in current position.
   */
  locked: boolean;
};

/** Represents the coordinates of the device. */
export type Location = {
  /**
   * The latitude coordinate for the device.
   */
  lat: number;

  /**
   * The longitudinal coordinate of the device.
   */
  lon: number;

  /**
   * The source of location data.
   */
  type: number;

  /**
   * The estimated location accuracy in meters.
   */
  accuracy: number;

  /**
   * The number of seconds since this geolocation fix was established.
   */
  lastfix: number;

  /**
   * The service of provider used to determine geolocation from IP address if applicable.
   */
  ipservice: string;
};

/** Represents the host provides to the ad when requested. */
export type MraidEnv = {
  /**
   * The version of the MRAID spec implemented by this SDK. It must equal the
   * same value returned by the getVersion method of mraid interface.
   */
  version: string;

  /**
   * The name of the SDK running this webview.
   */
  sdk?: string;

  /**
   * The SDK version string. String may be left empty if no version is available.
   */
  sdkVersion?: string;

  /**
   * The package name or application ID of the app running this ad. Usually
   * referred to as the bundle id.
   */
  appId?: string;

  /**
   * The user identifier for advertising purposes. For iOS, this must be
   * Identifier for Advertising (IDFA). For Android this must be the Google
   * Advertising ID(AID)
   */
  ifa?: string;

  /**
   * Whether the limit ad tracking is enabled.
   */
  limitAdTracking?: boolean;

  /**
   * Whether the child-direct ad is enabled.
   */
  coppa?: boolean;
};

export type ValidateResult = {
  passed: boolean;
  message?: string;
};
