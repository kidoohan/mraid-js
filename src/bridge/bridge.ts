import { LogLevel, OrientationType } from "../types";

/**
 * An interface describing a bridge for MRAID.
 */
export interface Bridge {
  log(logLevel: LogLevel, message: string): void;

  open(uri: string): void;

  close(): void;

  useCustomClose(useCustomClose: boolean): void;

  unload(): void;

  resize(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    customClosePosition: string,
    allowOffscreen: boolean,
  ): void;

  expand(
    width: number,
    height: number,
    useCustomClose: boolean,
    isModal: boolean,
    url: string | null,
  ): void;

  setOrientationProperties(
    allowOrientationChange: boolean,
    forceOrientation: OrientationType,
  ): void;

  playVideo(uri: string): void;

  storePicture(uri: string): void;
}
