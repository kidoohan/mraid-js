export const LOG_LEVELS = {
  /** Log level for `debug`. */
  DEBUG: "debug",

  /** Log level for `info`. */
  INFO: "info",

  /** Log level for `warning`. */
  WARNING: "warning",

  /** Log level for `error`. */
  ERROR: "error",
} as const;

export const FEATURE_TYPES = {
  /** The devices supports using the sms: protocol to send an SMS message. */
  SMS: "sms",

  /** The devices supports initiating calls using the tel: protocol. */
  TEL: "tel",

  /** The device can create a calendar entry. */
  CALENDAR: "calendar",

  /** The device supports the MRAID storePicture method. */
  STORE_PICTURE: "storePicture",

  /**
   * The device can play HTML5 video files using the `<video>` tag and
   * honors the size (width and height) specified in the video tag.
   * This does not require the video to be played in full screen.
   */
  INLINE_VIDEO: "inlineVideo",

  /**
   * The device container supports VPAID handshake with ad to communicate VPAID
   * events.
   */
  VPAID: "vpaid",

  /** The device supports access to GPS coordinates. */
  LOCATION: "location",
} as const;

export const ORIENTATION_TYPES = {
  /** The portrait mode. */
  PORTRAIT: "portrait",

  /** The landscape mode. */
  LANDSCAPE: "landscape",

  /** The none (default). */
  NONE: "none",
} as const;

export const PLACEMENT_TYPES = {
  /** Unknown placement type. */
  UNKNOWN: "unknown",

  /** Inline placement type. */
  INLINE: "inline",

  /** Interstitial placement type. */
  INTERSTITIAL: "interstitial",
} as const;

export const CLOSE_POSITION_TYPES = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  CENTER: "center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center",
} as const;

export const STATES = {
  /** The container is not yet ready for interactions with the MRAID implementation. */
  LOADING: "loading",

  /** The initial position and size of the ad container as placed by the application and SDK. */
  DEFAULT: "default",

  /** The ad container has expanded to cover the application content at the top of the view hierarchy. */
  EXPANDED: "expanded",

  /** the state an interstitial ad transitions to when closed. Where supported, the state a banner ad transitions to when closed. */
  HIDDEN: "hidden",

  /** The ad container has changed size via MRAID 2.0's resize() method. */
  RESIZED: "resized",
} as const;
