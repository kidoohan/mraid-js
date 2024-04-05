import { Rectangle } from "./rectangle";
import { isFunction, isIncludes } from "./validate";
import { State } from "./types";

/**
 * Indicates the event type for the MRAID.
 */
export const EVENT_TYPES = {
  /** Event for reporting an error. */
  ERROR: "error",

  /** Event for reporting that MRAID libraries are loaded. */
  READY: "ready",

  /** Event for reporting that the state of the ad container has changed. */
  STATE_CHANGE: "stateChange",

  /** Event for reporting a change in ad container viewability. */
  VIEWABLE_CHANGE: "viewableChange",

  /** Event for reporting that ad container dimensions have changed. */
  SIZE_CHANGE: "sizeChange",

  /** Event for reporting that the percentage of ad container exposure has changed. */
  EXPOSURE_CHANGE: "exposureChange",

  /** Event for reporting a change in volume. */
  AUDIO_VOLUME_CHANGE: "audioVolumeChange",
} as const;
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

// region MRAID listener types

export type ErrorEventListener = (message: string, action: string) => void;
export type ReadyEventListener = () => void;
export type SizeChangeEventListener = (width: number, height: number) => void;
export type StateChangeEventListener = (state: State) => void;
export type ExposureChangeEventListener = (
  exposedPercentage: number,
  visibleRectangle: Rectangle,
  occlusionRectangles?: Array<Rectangle> | null,
) => void;
export type AudioVolumeChangeEventListener = (volumePercentage: number) => void;
export type ViewableChangeEventListener = (isViewable: boolean) => void;

// endregion

export type EventListener =
  | ErrorEventListener
  | ReadyEventListener
  | SizeChangeEventListener
  | StateChangeEventListener
  | ExposureChangeEventListener
  | AudioVolumeChangeEventListener
  | ViewableChangeEventListener;

export const isEventListener = (value: unknown): value is EventListener => {
  return isFunction(value);
};

export class EventManager {
  private eventListeners: Record<EventType, Array<EventListener>> = {
    error: new Array<ErrorEventListener>(),
    ready: new Array<ReadyEventListener>(),
    stateChange: new Array<StateChangeEventListener>(),
    viewableChange: new Array<ViewableChangeEventListener>(),
    sizeChange: new Array<SizeChangeEventListener>(),
    exposureChange: new Array<ExposureChangeEventListener>(),
    audioVolumeChange: new Array<AudioVolumeChangeEventListener>(),
  };

  addEventListener(event: unknown, listener: unknown): void {
    if (!isIncludes(EVENT_TYPES, event)) {
      throw new Error("received invalid event");
    }
    if (!isEventListener(listener)) {
      throw new Error("received invalid listener.");
    }
    this.eventListeners[event]?.push(listener);
  }

  removeEventListener(event: unknown, listener: unknown): void {
    if (!isIncludes(EVENT_TYPES, event)) {
      throw new Error("received invalid event");
    }
    if (!isEventListener(listener)) {
      throw new Error("received invalid listener.");
    }
    const idx = this.eventListeners[event]?.indexOf(listener) ?? -1;
    if (idx > -1) {
      this.eventListeners[event]?.splice(idx, 1);
    }
  }

  fireErrorEvent(message: string, action: string): void {
    this.fireEvent(EVENT_TYPES.ERROR, (listener: ErrorEventListener) => {
      listener(message, action);
    });
  }

  fireReadyEvent(): void {
    this.fireEvent(EVENT_TYPES.READY, (listener: ReadyEventListener) => {
      listener();
    });
  }

  fireStateChangeEvent(newState: State): void {
    this.fireEvent(
      EVENT_TYPES.STATE_CHANGE,
      (listener: StateChangeEventListener) => {
        listener(newState);
      },
    );
  }

  fireViewableChangeEvent(isViewable: boolean): void {
    this.fireEvent(
      EVENT_TYPES.VIEWABLE_CHANGE,
      (listener: ViewableChangeEventListener) => {
        listener(isViewable);
      },
    );
  }

  fireSizeChangeEvent(width: number, height: number): void {
    this.fireEvent(
      EVENT_TYPES.SIZE_CHANGE,
      (listener: SizeChangeEventListener) => {
        listener(width, height);
      },
    );
  }

  fireExposureChangeEvent(
    exposedPercentage: number,
    visibleRectangle: Rectangle,
    occlusionRectangles?: Array<Rectangle> | null,
  ): void {
    this.fireEvent(
      EVENT_TYPES.EXPOSURE_CHANGE,
      (listener: ExposureChangeEventListener) => {
        listener(exposedPercentage, visibleRectangle, occlusionRectangles);
      },
    );
  }

  fireAudioVolumeChangeEvent(volumePercentage: number) {
    this.fireEvent(
      EVENT_TYPES.AUDIO_VOLUME_CHANGE,
      (listener: AudioVolumeChangeEventListener) => {
        listener(volumePercentage);
      },
    );
  }

  private fireEvent<T>(event: EventType, block: (t: T) => void): void {
    this.eventListeners[event]?.forEach((listener: EventListener) => {
      block(listener as T);
    });
  }
}
