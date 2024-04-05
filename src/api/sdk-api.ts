import { MraidEnv, OrientationType, PlacementType, State } from "../types";
import { DeviceFeatures } from "../device-features";
import { Rectangle } from "../rectangle";

/**
 * API for SDK to communicate with `window.mraidBridge` object.
 */
export type SdkApi = {
  // region events
  /**
   * Called when the error occurred.
   *
   * @param message - The description of the error that occurred.
   * @param action - The name of action attempted when the error occurred.
   */
  onError: (message: string, action: string) => void;

  /**
   * Called when the host is ready to receive mraid calls from the ad.
   */
  onReady: () => void;

  /**
   * Called whenever the ad container dimensions change in response to orientation,
   * an ad resize request, or ad expand request.
   *
   * @param width - The width of the view.
   * @param height - The height of the view.
   */
  onSizeChanged: (width: number, height: number) => void;

  /**
   * Called when the state of the ad container is changes.
   *
   * @param state - The string indicating either `loading`, `default`, `expanded`,
   * `resized`, or `hidden`
   */
  onStateChanged: (state: State) => void;

  /**
   * Called when the exposed area changes.
   *
   * @param exposedPercentage -
   * The percentage of ad that is visible on screen, a floating-point number
   * between 0.0 and 100.0, or 0.0 if not visible.
   * @param visibleRectangle -
   * The visible portion of the ad container, or null if not visible.
   * @param occlusionRectangles -
   * The array of rectangles describing the sections of the `visibleRectangle`
   * that are not visible, or null if occlusion detection is not used or relevant.
   */
  onExposureChanged: (
    exposedPercentage: number,
    visibleRectangle: Rectangle,
    occlusionRectangles?: Array<Rectangle> | null,
  ) => void;

  /**
   * Called when the viewability of the ad container changes.
   *
   * @param isViewable - Whether the container is visible on the screen and viewable.
   */
  onViewableChanged: (isViewable: boolean) => void;

  /**
   * Called when the audio volume of the device changes.
   *
   * @param volumePercentage - The percentage of maximum audio playback volume.
   */
  onAudioVolumeChanged: (volumePercentage: number) => void;

  // endregion

  // region properties

  /**
   * Sets the current position and size of the ad container in the mediator object.
   *
   * @param x - The number of density-independent pixels offset from left
   * edge of the rectangle defining getMaxSize().
   * @param y - The number of density-independent pixels offset from top
   * of the rectangle defining getMaxSize().
   * @param width - The current width of container in density-independent
   * pixels.
   * @param height - The current height of container in density independent
   * pixels.
   */
  setCurrentPosition: (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;

  /**
   * Sets the dimensions of the device screen size in the mediator object.
   *
   * @param width - The width of the device screen.
   * @param height - The height of the device screen.
   */
  setScreenSize: (width: number, height: number) => void;

  /**
   * Sets the maximum size to which the ad may resize in the mediator object.
   *
   * @param width - The maximum width of the webview.
   * @param height - the maximum height of the webview.
   */
  setMaxSize: (width: number, height: number) => void;

  /**
   * Sets the current orientation of the app in the mediator object.
   *
   * @param orientation - The value may be either `portrait` or `landscape`.
   * @param locked - The value indicating whether orientation is locked in current position.
   */
  setCurrentAppOrientation: (
    orientation: OrientationType,
    locked: boolean,
  ) => void;

  /**
   * Sets the features that device supports in the mediator object.
   *
   * @param supportedFeatures - The features that device supports.
   */
  setSupports: (supportedFeatures: DeviceFeatures) => void;

  /**
   * Sets whether ad is loaded in an inline or interstitial placement.
   *
   * @param placementType - The value maybe either `inline` or `interstitial`.
   */
  setPlacementType: (placementType: PlacementType) => void;

  /**
   * Sets the position and size of the default ad container in the mediator object.
   *
   * @param x - The number of density-independent pixels offset from left
   * edge of the rectangle defining `getMaxSize()`.
   * @param y - The number of density-independent pixels offset from top
   * of the rectangle defining `getMaxSize()`.
   * @param width - The current width of container in density-independent pixels.
   * @param height - The current height of container in density-independent pixels.
   */
  setDefaultPosition: (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;

  /**
   * Resets the orientation properties in the mediator object.
   */
  resetOrientationProperties: () => void;
  // endregion

  /**
   * Sets the window.MRAID_ENV.
   *
   * @param mraidEnv - The object to facilitate the early passing of version and other
   * relevant attributes at initialization time.
   */
  setMRAIDEnv: (mraidEnv: MraidEnv) => void;
};
