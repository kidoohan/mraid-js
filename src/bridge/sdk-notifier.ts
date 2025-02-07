import { Bridge } from "./bridge";
import { LogLevel, OrientationType } from "../types";
import { isString } from "../validate";

export class SdkNotifier implements Bridge {
  /** The sdk bridges. */
  private mraidBridges: Bridge[];

  /** The queue of native calls. */
  private nativeCallQueue: string[];

  constructor(mraidBridges: Bridge[]) {
    this.mraidBridges = mraidBridges;
    this.nativeCallQueue = [];
  }

  // region Bridge implementation

  log(logLevel: LogLevel, message: string): void {
    this.callApi((bridge) => {
      bridge.log(logLevel, message);
    });
    this.executeNativeCall(
      `mraid://log?logLevel=${encodeURIComponent(logLevel)}&message=${encodeURIComponent(message)}`,
    );
  }

  open(uri: string): void {
    this.callApi((bridge) => {
      bridge.open(uri);
    });
    this.executeNativeCall(`mraid://open?uri=${encodeURIComponent(uri)}`);
  }

  close(): void {
    this.callApi((bridge) => {
      bridge.close();
    });
    this.executeNativeCall(`mraid://close`);
  }

  useCustomClose(useCustomClose: boolean): void {
    this.callApi((bridge) => {
      bridge.useCustomClose(useCustomClose);
    });
    this.executeNativeCall(
      `mraid://useCustomClose?useCustomClose=${encodeURIComponent(useCustomClose)}`,
    );
  }

  unload(): void {
    this.callApi((bridge) => {
      bridge.unload();
    });
    this.executeNativeCall(`mraid://unload`);
  }

  resize(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    customClosePosition: string,
    allowOffscreen: boolean,
  ): void {
    this.callApi((bridge) => {
      bridge.resize(
        width,
        height,
        offsetX,
        offsetY,
        customClosePosition,
        allowOffscreen,
      );
    });
    this.executeNativeCall(
      `mraid://resize?width=${encodeURIComponent(width)}&height=${encodeURIComponent(height)}&offsetX=${encodeURIComponent(offsetX)}&offsetY=${encodeURIComponent(offsetY)}&customClosePosition=${encodeURIComponent(customClosePosition)}&allowOffscreen=${encodeURIComponent(allowOffscreen)}`,
    );
  }

  expand(
    width: number,
    height: number,
    useCustomClose: boolean,
    isModal: boolean,
    url: string | null,
  ): void {
    this.callApi((bridge) => {
      bridge.expand(width, height, useCustomClose, isModal, url);
    });
    let nativeCall = `mraid://expand?width=${encodeURIComponent(width)}&height=${encodeURIComponent(height)}&useCustomClose=${encodeURIComponent(useCustomClose)}&isModal=${encodeURIComponent(isModal)}`;
    if (url) {
      nativeCall += `&url=${encodeURIComponent(url)}`;
    }

    this.executeNativeCall(nativeCall);
  }

  setOrientationProperties(
    allowOrientationChange: boolean,
    forceOrientation: OrientationType,
  ): void {
    this.callApi((bridge) => {
      bridge.setOrientationProperties(allowOrientationChange, forceOrientation);
    });
    this.executeNativeCall(
      `mraid://setOrientationProperties?allowOrientationChange=${encodeURIComponent(allowOrientationChange)}&forceOrientation=${encodeURIComponent(forceOrientation)}`,
    );
  }

  playVideo(uri: string): void {
    this.callApi((bridge) => {
      bridge.playVideo(uri);
    });
    this.executeNativeCall(`mraid://playVideo?uri=${encodeURIComponent(uri)}`);
  }

  storePicture(uri: string): void {
    this.callApi((bridge) => {
      bridge.storePicture(uri);
    });
    this.executeNativeCall(
      `mraid://storePicture?uri=${encodeURIComponent(uri)}`,
    );
  }

  // endregion

  private callApi(block: (bridge: Bridge) => void) {
    this.mraidBridges.forEach((bridge) => {
      block(bridge);
    });
  }

  private executeNativeCall(call: string) {
    this.nativeCallQueue.push(call);
    if (this.nativeCallQueue.length === 1) {
      setTimeout(this.dequeue.bind(this), 0);
    }
  }

  private dequeue() {
    const nativeCall = this.nativeCallQueue.shift();
    if (isString(nativeCall)) {
      window.location.href = nativeCall;
    }
    if (this.nativeCallQueue.length > 0) {
      setTimeout(this.dequeue.bind(this), 0);
    }
  }
}
