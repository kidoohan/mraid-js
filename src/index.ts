import { Mediator } from "./mediator";
import { EventManager } from "./event-manager";
import { MraidApi, SdkApi } from "./api";
import { AndroidBridge, SdkNotifier, IosBridge } from "./bridge";
import { MraidEnv } from "./types";

declare global {
  interface Window {
    mraid?: MraidApi;
    mraidBridge?: SdkApi;
    MRAID_ENV?: MraidEnv;
  }
}

const sdkNotifier = new SdkNotifier([new AndroidBridge(), new IosBridge()]);
const eventManager = new EventManager();
const mediator = new Mediator(sdkNotifier, eventManager);

window.mraid = window.mraid ?? mediator.mraidApi;
window.mraidBridge = window.mraidBridge ?? mediator.sdkApi;
