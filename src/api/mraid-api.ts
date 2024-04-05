import { ExpandProperties } from "../expand-properties";
import { OrientationProperties } from "../orientation-properties";
import { Rectangle } from "../rectangle";
import { Size } from "../size";
import { ResizeProperties } from "../resize-properties";
import { AppOrientation, PlacementType, State, Location } from "../types";

/**
 * API for Creative to communicate with `window.mraid` object.
 */
export type MraidApi = {
  // region MRAID V1

  /**
   * Returns the version of MRAID that the host supports (1.0, 2.0, or 3.0, etc),
   * NOT the version of the vendor's SDK.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @returns The string that indicates the MRAID version with which the SDK is
   * compliant (not the version fo the SDK).
   */
  getVersion: () => string;

  /**
   * Registers a specific `listener` for a specific `event`. The ad may register
   * more thant one listener, each to support listening for separate event.
   * The host dispatches an event to all registered listeners for each specific
   * event has occurs. The ad may also register a single listener to multiple
   * events instead of a listener for each event.
   *
   * @example
   * ```javascript
   * function showMyAd() {
   *   ...
   * }
   *
   * mraid.addEventListener('ready', showMyAd);
   * ```
   *
   * @remarks
   * Since MRAID V1.
   *
   * @param event - The string for the name of the event to listen for.
   * @param listener - The function to execute.
   */
  addEventListener: (event: unknown, listener: unknown) => void;

  /**
   * Unregisters a specific `listener` for a specific `event`. When the ad no
   * longer needs notification of a particular event, `removeEventListener()` is
   * used to unregister to that event.
   * To avoid errors, event listeners must always be removed when they are no
   * longer needed. If not listener function is specified in the `listener`
   * attribute for the call, then all functions listening to the event will be
   * removed.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @param event - The string for the name of the event to remove.
   * @param listener - The function to be removed.
   */
  removeEventListener: (event: unknown, listener: unknown) => void;

  /**
   * Returns the current state of the ad container using values that describe
   * whether the ad container is in its default ad fixed position, in an expanded
   * or resize state, a larger position, or hidden.
   *
   * @remarks
   * See {@link State} for more details.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @returns The string that one of the `loading`, `default`, `expanded`, `resized`, `hidden`.
   */
  getState: () => State;

  /**
   * Prompts the host to open an external mobile website in a browser window
   * that is the default browser on the user's device The purpose of this method
   * is to handle clickthroughs in the ad.
   *
   * All MRAID ads must handle clickthroughs using the `open()` method.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @param uri - the string for the URL of the webpage to be opened.
   */
  open: (uri: unknown) => void;

  /**
   * Downgrades the container state.
   *
   * @remarks
   * Since MRAID V1.
   */
  close: () => void;

  /**
   * Requests ad container expansion, either by changing the
   * width and height of the current webview (one-part creative) or by opening
   * a new webview at the highest level in an expanded size (two-part creative).
   * The expanded view can either contain a new HTML document if a `url`
   *
   * @remarks
   * Since MRAID V1.
   *
   * @param url - the URL for the document to be displayed in a new overlay
   * view. If null or a non-URL parameter is used, the body of the current ad
   * will be used in the current webview.
   */
  expand: (url: unknown) => void;

  /**
   * Returns the current expand properties.
   *
   * @remarks
   * See {@link ExpandProperties| the ExpandProperties class} for more details.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @returns The current {@link ExpandProperties| expand properties}.
   */
  getExpandProperties: () => ExpandProperties;

  /**
   * Sets the width and height for an expansion along with optionally specifying
   * the use of a custom close indicator.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @param expandProperties - The {@link ExpandProperties| expand properties}
   * for the ad expansion.
   */
  setExpandProperties: (expandProperties: unknown) => void;

  /**
   * Returns the {@link PlacementType | placement type} to determine
   * whether it's being loaded in an `inline` placement or an `interstitial`.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @returns The either `inline` or `interstitial` placement type.
   */
  getPlacementType: () => PlacementType;

  /**
   * Requests video play in native player. To play the video inline rather than
   * in the native player, the ad designer must sue HTML5 video tags instead.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @param uri - The URI of the video or video stream.
   */
  playVideo: (uri: unknown) => void;

  /**
   * @deprecated in MRAID 3.0; should still be provided by SDKs for backwards
   * compatibility, but will not be honoured
   *
   * @remarks
   * Since MRAID V1.
   */
  useCustomClose: (shouldUseCustomClose: unknown) => void;

  /**
   * Returns whether the ad container is currently on or off the screen. The
   * `viewableChange` event fires when the ad moves from on-screen to off-screen
   * and vice versa.
   *
   * @remarks
   * Since MRAID V1.
   *
   * @returns The `true` if container is on-screen and viewable by the user
   * according to established values. The `false` if container is off-screen
   * and not viewable.
   *
   * @deprecated in MRAID 3.0; should still be provided by SDKs for backwards
   * compatibility
   */
  isViewable: () => boolean;

  // endregion

  // region MRAID V2

  /**
   * Returns whether given `feature` is supported.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @param feature - The {@link FeatureType}.
   * @returns The `true` if given `feature` is supported and getter and events
   * are available. The `false` if given `feature` is not supported on this
   * device.
   */
  supports: (feature: unknown) => boolean;

  /**
   * Requests ad container size change to accommodates the new ad size. Resize
   * is used for a succession of changes or a size change that is less than
   * full screen size and that doesn't interfere with app operation.
   *
   * @remarks
   * Since MRAID V2.
   */
  resize: () => void;

  /**
   * Requests that the user be prompted to store the picture to their device.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @param uri - The URI to the image or other media asset.
   */
  storePicture: (uri: unknown) => void;

  /**
   * Requests that the user be prompted to add the event to their device calendar.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @param parameters - The W3Cs calendar specification.
   */
  createCalendarEvent: (parameters: unknown) => void;

  /**
   * Returns the details on landscape or portrait orientation.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @returns The current {@link OrientationProperties| orientation properties}.
   */
  getOrientationProperties: () => OrientationProperties;

  /**
   * Sets the {@link OrientationProperties | orientation properties} for
   * allowing or locking orientation, if supported, for ad display.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @param orientationProperties - the {@link OrientationProperties| orientation properties}
   * to update.
   */
  setOrientationProperties: (orientationProperties: unknown) => void;

  /**
   * Returns the current coordinates of the ad container.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @returns The current {@link Rectangle| coordinates of the ad container}.
   */
  getCurrentPosition: () => Rectangle;

  /**
   * Returns the default coordinates of the ad container.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @returns the current {@link Rectangle| the default coordinates of the ad container}.
   */
  getDefaultPosition: () => Rectangle;

  /**
   * Returns the current max ad container dimension available.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @returns The current {@link Rectangle| max ad container dimension}
   */
  getMaxSize: () => Size;

  /**
   * Returns the dimension of device screen.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @returns The {@link Size| screen size}.
   */
  getScreenSize: () => Size;

  /**
   * Returns the current dimensions of the ad container in its resized state.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @returns The current {@link ResizeProperties| resize properties}.
   */
  getResizeProperties: () => ResizeProperties;

  /**
   * Sets the ad specifies dimensions for resizing the ad container.
   *
   * @remarks
   * Since MRAID V2.
   *
   * @param resizeProperties - The {@link ResizeProperties| resize properties} to update.
   */
  setResizeProperties: (resizeProperties: unknown) => void;
  // endregion

  // region MRAID V3
  /**
   * Allows the ad to communicate to the host that ad must no longer be shown to
   * the user. The ad can request the host to completely dismiss the ad by using
   * the `unload()` method. The host responds by dismissing the ad and then
   * either removing the webview or replacing it with another document or
   * refreshing it with a new ad.
   *
   * @remarks
   * Since MRAID V3.
   */
  unload: () => void;

  /**
   * Returns the current orientation of the app.
   *
   * @remarks
   * Since MRAID V3.
   *
   * @returns The current {@link AppOrientation| orientation of the app}.
   */
  getCurrentAppOrientation: () => AppOrientation;

  /**
   * Returns the current coordinates of the device.
   *
   * @remarks
   * Since MRAID V3.
   *
   * @returns The current {@link Location}.
   */
  getLocation: () => Location;

  // endregion
};
