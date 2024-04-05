import { instance, mock } from "ts-mockito";
import { Mediator } from "../src/mediator";
import { EventManager } from "../src/event-manager";
import { STATES } from "../src/constants";
import { SdkNotifier } from "../src/bridge";

let mraid: Mediator;
let sdkNotifier: SdkNotifier;
let eventManager: EventManager;
let contentWindow: Window;

describe("mediator", () => {
  beforeEach(() => {
    sdkNotifier = mock(SdkNotifier);
    eventManager = mock(EventManager);

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    contentWindow = iframe.contentWindow as Window;

    mraid = new Mediator(instance(sdkNotifier), instance(eventManager));
  });

  test("when create mraidApi property given no interactions should have loading state.", () => {
    expect(mraid.mraidApi.getState()).toBe(STATES.LOADING);
  });

  test("when getVersion should return 3.0", () => {
    expect(mraid.mraidApi.getVersion()).toBe("3.0");
  });
});
