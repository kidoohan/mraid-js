import { OrientationProperties } from "./orientation-properties";
import { Rectangle } from "./rectangle";
import { ExpandProperties } from "./expand-properties";
import { Size } from "./size";
import { ResizeProperties } from "./resize-properties";
import { DeviceFeatures } from "./device-features";
import { isBoolean, isString, isIncludes, isNumber } from "./validate";
import { EventManager } from "./event-manager";
import { Logger } from "./logger";
import {
  FEATURE_TYPES,
  LOG_LEVELS,
  ORIENTATION_TYPES,
  PLACEMENT_TYPES,
  CLOSE_POSITION_TYPES,
  STATES,
} from "./constants";
import { MraidApi, SdkApi } from "./api";
import { SdkNotifier } from "./bridge";
import {
  AppOrientation,
  Location,
  MraidEnv,
  OrientationType,
  PlacementType,
  State,
} from "./types";

export class Mediator {
  private sdkNotifier: SdkNotifier;

  private eventManager: EventManager;

  private logger: Logger;

  private state: State = STATES.LOADING;

  private placementType: PlacementType = PLACEMENT_TYPES.UNKNOWN;

  private supportFeatures: DeviceFeatures = new DeviceFeatures(
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  );

  private resizeProperties: ResizeProperties = new ResizeProperties(
    0,
    0,
    0,
    0,
    CLOSE_POSITION_TYPES.TOP_RIGHT,
    true,
  );

  private expandProperties: ExpandProperties = new ExpandProperties(
    -1,
    -1,
    false,
    true,
  );

  private orientationProperties: OrientationProperties =
    new OrientationProperties(false, ORIENTATION_TYPES.NONE);

  private currentAppOrientation: AppOrientation = {
    orientation: ORIENTATION_TYPES.NONE,
    locked: false,
  };

  private lastSizeChangeProperties: Size | undefined;

  private maxSize: Size = { width: 0, height: 0 };

  private screenSize: Size = { width: 0, height: 0 };

  private currentPosition: Rectangle = { width: 0, height: 0, x: 0, y: 0 };

  private defaultPosition: Rectangle = { width: 0, height: 0, x: 0, y: 0 };

  private viewable: boolean = false;

  /** MraidApi implementation */
  mraidApi: MraidApi = {
    getVersion: (): string => {
      return window.MRAID_ENV?.version ?? "3.0";
    },

    addEventListener: (event: unknown, listener: unknown) => {
      try {
        this.eventManager.addEventListener(event, listener);
      } catch (e) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "addEventListener",
          `error when addEventListener, event = ${event}, listenerType = ${typeof listener}`,
        );
      }
    },

    removeEventListener: (event: unknown, listener: unknown) => {
      try {
        this.eventManager.removeEventListener(event, listener);
      } catch (e) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "removeEventListener",
          `error when removeEventListener, event = ${event}, listenerType = ${typeof listener}`,
        );
      }
    },

    open: (uri: unknown) => {
      if (!isString(uri)) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "open",
          "open must be called with a valid uri.",
        );
        return;
      }
      this.sdkNotifier.open(uri);
    },

    close: () => {
      this.sdkNotifier.close();
    },

    useCustomClose: (shouldUseCustomClose: unknown) => {
      if (!isBoolean(shouldUseCustomClose)) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "useCustomClose",
          "'shouldUseCustomClose' is not a valid type.",
        );
      } else {
        this.expandProperties.useCustomClose = shouldUseCustomClose;
        this.sdkNotifier.useCustomClose(shouldUseCustomClose);
      }
    },

    unload: () => {
      this.sdkNotifier.unload();
    },

    expand: (url: unknown) => {
      switch (this.state) {
        case STATES.DEFAULT:
        case STATES.RESIZED:
          if (this.placementType !== PLACEMENT_TYPES.INLINE) {
            this.logger.log(
              LOG_LEVELS.ERROR,
              "expand",
              `expand cannot be called be called for the placement type ${this.placementType}.`,
            );
          } else {
            this.sdkNotifier.expand(
              this.expandProperties.width,
              this.expandProperties.height,
              this.expandProperties.useCustomClose,
              this.expandProperties.isModal,
              isString(url) ? url : null,
            );
          }
          break;
        default:
          this.logger.log(
            LOG_LEVELS.ERROR,
            "expand",
            `expand cannot be called while state is '${this.state}'.`,
          );
      }
    },

    isViewable: () => {
      return this.viewable;
    },

    playVideo: (uri: unknown) => {
      if (!this.viewable) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "playVideo",
          "playVideo cannot be called until te ad is viewable.",
        );
      } else if (isString(uri)) {
        this.sdkNotifier.playVideo(uri);
      } else {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "playVideo",
          "playVideo must be called with a valid uri.",
        );
      }
    },

    resize: () => {
      if (this.placementType !== PLACEMENT_TYPES.INLINE) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "resize",
          `'${this.placementType}' placement type not supported.`,
        );
      } else {
        switch (this.state) {
          case STATES.DEFAULT:
          case STATES.RESIZED:
            try {
              const { resizeProperties } = this;
              this.resizeProperties.validate(resizeProperties);
              this.sdkNotifier.resize(
                resizeProperties.width,
                resizeProperties.height,
                resizeProperties.offsetX,
                resizeProperties.offsetY,
                resizeProperties.customClosePosition,
                resizeProperties.allowOffscreen,
              );
            } catch (e: any) {
              this.logger.log(
                LOG_LEVELS.ERROR,
                "resize",
                e.message ?? "Error when resize().",
              );
            }
            break;
          default:
            this.logger.log(
              LOG_LEVELS.ERROR,
              "resize",
              `resize cannot be called while state is '${this.state}'.`,
            );
        }
      }
    },

    storePicture: (uri: unknown) => {
      if (!this.viewable) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "storePicture",
          "storePicture cannot be called until te ad is viewable.",
        );
      } else if (isString(uri)) {
        this.sdkNotifier.storePicture(uri);
      } else {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "storePicture",
          "storePicture must be called with a valid uri.",
        );
      }
    },

    createCalendarEvent: (parameters: unknown) => {
      this.logger.log(
        LOG_LEVELS.ERROR,
        "createCalendarEvent",
        "createCalendarEvent is not supported.",
      );
    },

    supports: (feature: unknown): boolean => {
      if (isIncludes(FEATURE_TYPES, feature)) {
        return this.supportFeatures[feature];
      }
      this.logger.log(LOG_LEVELS.ERROR, "supports", "received invalid feature");
      return false;
    },

    getPlacementType: (): PlacementType => {
      return this.placementType;
    },

    getOrientationProperties: (): OrientationProperties => {
      return this.orientationProperties.clone();
    },

    setOrientationProperties: (orientationProperties: unknown) => {
      try {
        this.orientationProperties.update(
          orientationProperties as OrientationProperties,
        );
        this.sdkNotifier.setOrientationProperties(
          this.orientationProperties.allowOrientationChange,
          this.orientationProperties.forceOrientation,
        );
      } catch (e: any) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "setOrientationProperties",
          e.message ?? "setOrientationProperties called with invalid options.",
        );
      }
    },

    getCurrentAppOrientation: (): AppOrientation => {
      return { ...this.currentAppOrientation };
    },

    getCurrentPosition: (): Rectangle => {
      return {
        x: this.currentPosition.x,
        y: this.currentPosition.y,
        width: this.currentPosition.width,
        height: this.currentPosition.height,
      };
    },

    getDefaultPosition: (): Rectangle => {
      return { ...this.defaultPosition };
    },

    getState: (): State => {
      return this.state;
    },

    getExpandProperties: (): ExpandProperties => {
      return this.expandProperties.clone();
    },

    setExpandProperties: (expandProperties: unknown) => {
      try {
        this.expandProperties.update(expandProperties as ExpandProperties);
      } catch (e: any) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "setExpandProperties",
          e.message ?? "Error when setExpandProperties().",
        );
      }
    },

    getMaxSize: (): Size => {
      return { ...this.maxSize };
    },

    getScreenSize: (): Size => {
      return { ...this.screenSize };
    },

    getResizeProperties: (): ResizeProperties => {
      return this.resizeProperties.clone();
    },

    setResizeProperties: (resizeProperties: any) => {
      try {
        this.resizeProperties.update(resizeProperties);
      } catch (e: any) {
        this.logger.log(
          LOG_LEVELS.ERROR,
          "setResizeProperties",
          e.message ?? "Error when setExpandProperties().",
        );
      }
    },

    getLocation: (): Location => {
      return {
        lat: -1.0,
        lon: -1.0,
        type: 1,
        accuracy: -1,
        lastfix: -1,
        ipservice: "",
      };
    },
  };

  /** SdkApi implementation */
  sdkApi: SdkApi = {
    // region events

    onError: (message: string, action: string) => {
      this.eventManager.fireErrorEvent(message, action);
    },

    onReady: () => {
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "onReady",
        `with MRAID_ENV=${JSON.stringify(window.MRAID_ENV)}`,
      );
      this.eventManager.fireReadyEvent();
    },

    onSizeChanged: (width: number, height: number) => {
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "onSizeChanged",
        `with width=${width}, height=${height}`,
      );
      if (
        this.lastSizeChangeProperties?.width === width &&
        this.lastSizeChangeProperties?.height === height
      ) {
        return;
      }

      this.lastSizeChangeProperties = {
        width,
        height,
      };
      this.eventManager.fireSizeChangeEvent(width, height);
    },

    onStateChanged: (state: State) => {
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "onStateChanged",
        `with state=${state}`,
      );
      if (this.state !== state || state === STATES.RESIZED) {
        this.state = state;
        this.eventManager.fireStateChangeEvent(state);
      }
    },

    onExposureChanged: (
      exposedPercentage: number,
      visibleRectangle: Rectangle,
      occlusionRectangles?: Array<Rectangle> | null,
    ) => {
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "onExposureChanged",
        `with exposedPercentage=${exposedPercentage}, visibleRectangle=${JSON.stringify(
          visibleRectangle,
        )}, occlusionRectangles=${JSON.stringify(occlusionRectangles)}`,
      );
      this.eventManager.fireExposureChangeEvent(
        exposedPercentage,
        visibleRectangle,
        occlusionRectangles,
      );
    },

    onViewableChanged: (isViewable: boolean) => {
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "onViewableChanged",
        `with isViewable=${isViewable}`,
      );
      if (this.viewable !== isViewable) {
        this.viewable = isViewable;
        this.eventManager.fireViewableChangeEvent(isViewable);
      }
    },

    onAudioVolumeChanged: (volumePercentage: number) => {
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "onAudioVolumeChanged",
        `with volumePercentage=${volumePercentage}`,
      );
      if (this.state !== STATES.LOADING) {
        this.eventManager.fireAudioVolumeChangeEvent(volumePercentage);
      } else {
        this.logger.log(
          LOG_LEVELS.WARNING,
          "onAudioVolumeChanged",
          `can not change audio volume in 'loading' state.`,
        );
      }
    },

    // endregion

    // region properties

    setCurrentPosition: (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      this.currentPosition = { x, y, width, height };
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setCurrentPosition",
        `set current position to ${JSON.stringify(this.currentPosition)}.`,
      );
    },

    setScreenSize: (width: number, height: number) => {
      this.screenSize = { width, height };
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setScreenSize",
        `set screen size to ${JSON.stringify(this.screenSize)}.`,
      );
    },

    setMaxSize: (width: number, height: number) => {
      this.maxSize = { width, height };
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setMaxSize",
        `set max size to ${JSON.stringify(this.maxSize)}.`,
      );
    },

    setCurrentAppOrientation: (
      orientation: OrientationType,
      locked: boolean,
    ) => {
      this.currentAppOrientation = { orientation, locked };
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setCurrentAppOrientation",
        `set current app orientation to ${JSON.stringify(
          this.currentAppOrientation,
        )}.`,
      );
    },

    setSupports: (supportedFeatures: DeviceFeatures) => {
      this.supportFeatures.update(supportedFeatures);
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setSupports",
        `with ${JSON.stringify(supportedFeatures)}.`,
      );
    },

    setPlacementType: (placementType: PlacementType) => {
      this.placementType = placementType;
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setPlacementType",
        `set placement type to ${placementType}.`,
      );
    },

    setDefaultPosition: (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      this.defaultPosition = { x, y, width, height };
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setDefaultPosition",
        `set default position to ${JSON.stringify(this.defaultPosition)}.`,
      );
    },

    resetOrientationProperties: () => {
      this.orientationProperties.update(
        new OrientationProperties(true, ORIENTATION_TYPES.NONE),
      );
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "resetOrientationProperties",
        `reset orientation properties to ${JSON.stringify(
          this.orientationProperties,
        )}.`,
      );
    },

    // endregion

    setMRAIDEnv: (mraidEnv: MraidEnv) => {
      window.MRAID_ENV = mraidEnv;
      this.logger.log(
        LOG_LEVELS.DEBUG,
        "setMRAIDEnv",
        `with ${JSON.stringify(mraidEnv)}.`,
      );
    },
  };

  constructor(sdkNotifier: SdkNotifier, eventManager: EventManager) {
    this.sdkNotifier = sdkNotifier;
    this.eventManager = eventManager;
    this.logger = new Logger(sdkNotifier, eventManager);
  }
}
