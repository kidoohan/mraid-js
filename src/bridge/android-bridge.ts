import { Bridge } from "./bridge";
import { LogLevel, OrientationType } from "../types";

declare global {
  interface Window {
    adsJsInterface?: AdsJsInterface | null;
  }
}

export declare interface AdsJsInterface extends Bridge {}

/**
 * The bridge for android environment.
 */
export class AndroidBridge implements Bridge {
  // region Bridge implementation
  log(logLevel: LogLevel, message: string): void {
    this.getAdsJsInterface()?.log(logLevel, message);
  }

  open(uri: string): void {
    this.getAdsJsInterface()?.open(uri);
  }

  close(): void {
    this.getAdsJsInterface()?.close();
  }

  useCustomClose(useCustomClose: boolean): void {
    this.getAdsJsInterface()?.useCustomClose(useCustomClose);
  }

  unload(): void {
    this.getAdsJsInterface()?.unload();
  }

  resize(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    customClosePosition: string,
    allowOffscreen: boolean,
  ): void {
    this.getAdsJsInterface()?.resize(
      width,
      height,
      offsetX,
      offsetY,
      customClosePosition,
      allowOffscreen,
    );
  }

  expand(
    width: number,
    height: number,
    useCustomClose: boolean,
    isModal: boolean,
    url: string | null,
  ): void {
    this.getAdsJsInterface()?.expand(
      width,
      height,
      useCustomClose,
      isModal,
      url,
    );
  }

  setOrientationProperties(
    allowOrientationChange: boolean,
    forceOrientation: OrientationType,
  ): void {
    this.getAdsJsInterface()?.setOrientationProperties(
      allowOrientationChange,
      forceOrientation,
    );
  }

  playVideo(uri: string): void {
    this.getAdsJsInterface()?.playVideo(uri);
  }

  storePicture(uri: string): void {
    this.getAdsJsInterface()?.storePicture(uri);
  }

  // endregion

  private getAdsJsInterface(): AdsJsInterface | null | undefined {
    return window?.adsJsInterface;
  }
}
