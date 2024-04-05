import { Bridge } from "./bridge";
import { LogLevel, OrientationType } from "../types";

// region MessageHandler

export declare interface AdsMessageHandler {
  postMessage(params: IosMessage): void;
}

export declare interface MessageHandlers {
  adsMessageHandler: AdsMessageHandler;
}

export declare interface Webkit {
  messageHandlers: MessageHandlers;
}

declare global {
  interface Window {
    webkit: Webkit;
  }
}

// endregion

// region Messages

export declare interface IosMessage {
  action: string;
}

export declare interface LogIosMessage extends IosMessage {
  logLevel: LogLevel;
  message: string;
}

export declare interface OpenIosMessage extends IosMessage {
  uri: string;
}

export type CloseIosMessage = IosMessage;

export declare interface UseCustomCloseIosMessage extends IosMessage {
  useCustomClose: boolean;
}

export type UnloadIosMessage = IosMessage;

export declare interface ResizeIosMessage extends IosMessage {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  customClosePosition: string;
  allowOffscreen: boolean;
}

export declare interface ExpandIosMessage extends IosMessage {
  width: number;
  height: number;
  useCustomClose: boolean;
  isModal: boolean;
  url: string | null;
}

export declare interface SetOrientationPropertiesIosMessage extends IosMessage {
  allowOrientationChange: boolean;
  forceOrientation: OrientationType;
}

export declare interface PlayVideoIosMessage extends IosMessage {
  uri: string;
}

export declare interface StorePictureIosMessage extends IosMessage {
  uri: string;
}

// endregion

/** The bridge for iOS environment. */
export class IosBridge implements Bridge {
  // region Bridge implementation
  log(logLevel: LogLevel, message: string): void {
    const iosMessage: LogIosMessage = {
      action: "log",
      logLevel,
      message,
    };
    this.postMessage(iosMessage);
  }

  open(uri: string): void {
    const iosMessage: OpenIosMessage = {
      action: "open",
      uri,
    };
    this.postMessage(iosMessage);
  }

  close(): void {
    const iosMessage: CloseIosMessage = {
      action: "close",
    };
    this.postMessage(iosMessage);
  }

  useCustomClose(useCustomClose: boolean): void {
    const iosMessage: UseCustomCloseIosMessage = {
      action: "useCustomClose",
      useCustomClose,
    };
    this.postMessage(iosMessage);
  }

  unload(): void {
    const iosMessage: UnloadIosMessage = {
      action: "unload",
    };
    this.postMessage(iosMessage);
  }

  resize(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    customClosePosition: string,
    allowOffscreen: boolean,
  ): void {
    const iosMessage: ResizeIosMessage = {
      action: "resize",
      width,
      height,
      offsetX,
      offsetY,
      customClosePosition,
      allowOffscreen,
    };
    this.postMessage(iosMessage);
  }

  expand(
    width: number,
    height: number,
    useCustomClose: boolean,
    isModal: boolean,
    url: string | null,
  ): void {
    const iosMessage: ExpandIosMessage = {
      action: "expand",
      width,
      height,
      useCustomClose,
      isModal,
      url,
    };
    this.postMessage(iosMessage);
  }

  setOrientationProperties(
    allowOrientationChange: boolean,
    forceOrientation: OrientationType,
  ): void {
    const iosMessage: SetOrientationPropertiesIosMessage = {
      action: "setOrientationProperties",
      allowOrientationChange,
      forceOrientation,
    };
    this.postMessage(iosMessage);
  }

  playVideo(uri: string): void {
    const iosMessage: PlayVideoIosMessage = {
      action: "playVideo",
      uri,
    };
    this.postMessage(iosMessage);
  }

  storePicture(uri: string): void {
    const iosMessage: StorePictureIosMessage = {
      action: "storePicture",
      uri,
    };
    this.postMessage(iosMessage);
  }

  // endregion

  private postMessage(message: IosMessage) {
    window?.webkit?.messageHandlers?.adsMessageHandler?.postMessage(message);
  }
}
