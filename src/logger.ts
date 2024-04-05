import { SdkNotifier } from "./bridge";
import { EventManager } from "./event-manager";
import { LOG_LEVELS } from "./constants";
import { LogLevel } from "./types";

/**
 * The logger that can output message with `logLevel`, `method`.
 */
export class Logger {
  private sdkNotifier: SdkNotifier;

  private eventManager: EventManager;

  constructor(sdkNotifier: SdkNotifier, eventManager: EventManager) {
    this.sdkNotifier = sdkNotifier;
    this.eventManager = eventManager;
  }

  /**
   * Logs a message with `logLevel`, `method`.
   *
   * @param logLevel - The {@link LogLevel| logging level}.
   * @param method - The name of method that caused error.
   * @param message - The message to log;
   */
  log(logLevel: LogLevel, method: string, message: string) {
    const logMessage = `[MRAID] ${method}, ${message}`;

    this.sdkNotifier.log(logLevel, logMessage);
    switch (logLevel) {
      case LOG_LEVELS.DEBUG:
        console.debug(logMessage);
        break;
      case LOG_LEVELS.INFO:
        console.info(logMessage);
        break;
      case LOG_LEVELS.WARNING:
        console.warn(logMessage);
        break;
      case LOG_LEVELS.ERROR:
        console.error(logMessage);
        this.eventManager.fireErrorEvent(message, method);
        break;
      default:
        console.log(logMessage);
    }
  }
}
