import { anything, instance, mock, verify } from "ts-mockito";
import { EventManager } from "../src/event-manager";
import { SdkNotifier } from "../src/bridge";
import { Logger } from "../src/logger";
import { LOG_LEVELS } from "../src/constants";
import { LogLevel } from "../src/types";

let mockedSdkNotifier: SdkNotifier;
let mockedEventManager: EventManager;

let logger: Logger;

describe("Logger", () => {
  beforeEach(() => {
    // creating mock
    mockedSdkNotifier = mock(SdkNotifier);
    mockedEventManager = mock(EventManager);

    // creating Logger
    logger = new Logger(
      instance(mockedSdkNotifier),
      instance(mockedEventManager),
    );
  });

  it.each([LOG_LEVELS.WARNING, LOG_LEVELS.INFO, LOG_LEVELS.DEBUG])(
    "when log should log only to sdkNotifier",
    (logLevel: LogLevel) => {
      // given
      const method = "method()";
      const message = "message";

      // when
      logger.log(logLevel, method, message);

      // then
      verify(
        mockedSdkNotifier.log(logLevel, "[MRAID] method(), message"),
      ).once();
      verify(mockedEventManager.fireErrorEvent(anything(), anything())).never();
    },
  );

  test("when log error should log to sdkNotifier and fire error event", () => {
    // given
    const method = "method()";
    const message = "message";

    // when
    logger.log(LOG_LEVELS.ERROR, method, message);

    // then
    verify(
      mockedSdkNotifier.log(LOG_LEVELS.ERROR, "[MRAID] method(), message"),
    ).once();
    verify(mockedEventManager.fireErrorEvent(message, method)).once();
  });
});
