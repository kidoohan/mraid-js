import {
  EVENT_TYPES,
  EventManager,
  ErrorEventListener,
  ReadyEventListener,
  StateChangeEventListener,
  SizeChangeEventListener,
  ViewableChangeEventListener,
} from "../src/event-manager";
import { STATES } from "../src/constants";

let eventManager: EventManager;

describe("EventManager", () => {
  beforeEach(() => {
    eventManager = new EventManager();
  });

  describe("addEventListener", () => {
    it.each([null, undefined, NaN, Infinity, "", {}, true])(
      "with %p event then should throw an error",
      (param: any) => {
        expect(() => {
          eventManager.addEventListener(param, () => {});
        }).toThrow("received invalid event");
      },
    );

    it.each([null, undefined, NaN, Infinity, "", {}, true])(
      "with valid event and %p listener then should throw an error",
      (param: any) => {
        expect(() => {
          eventManager.addEventListener(EVENT_TYPES.READY, param);
        }).toThrow("received invalid listener");
      },
    );
  });

  describe("removeEventListener", () => {
    it.each([null, undefined, NaN, Infinity, "", {}, true])(
      "with %p event then should throw an error",
      (param: any) => {
        expect(() => {
          eventManager.removeEventListener(param, () => {});
        }).toThrow("received invalid event");
      },
    );

    it.each([null, undefined, NaN, Infinity, "", {}, true])(
      "with valid event and %p listener then should throw an error",
      (param: any) => {
        expect(() => {
          eventManager.removeEventListener(EVENT_TYPES.READY, param);
        }).toThrow("received invalid listener");
      },
    );
  });

  describe("fireErrorEvent", () => {
    let mockedEventListener1: ErrorEventListener;
    let mockedEventListener2: ErrorEventListener;

    beforeEach(() => {
      mockedEventListener1 = jest.fn();
      mockedEventListener2 = jest.fn();

      eventManager.addEventListener(EVENT_TYPES.ERROR, mockedEventListener1);
      eventManager.addEventListener(EVENT_TYPES.ERROR, mockedEventListener2);
    });

    test("should trigger multiple listeners", () => {
      // when
      eventManager.fireErrorEvent("foo", "bar");

      // then
      expect(mockedEventListener1).toHaveBeenCalledWith("foo", "bar");
      expect(mockedEventListener2).toHaveBeenCalledWith("foo", "bar");
    });

    test("after calling removeEventListener then should not trigger multiple listeners", () => {
      // given
      eventManager.removeEventListener(EVENT_TYPES.ERROR, mockedEventListener1);
      eventManager.removeEventListener(EVENT_TYPES.ERROR, mockedEventListener2);

      // when
      eventManager.fireErrorEvent("foo", "bar");

      // then
      expect(mockedEventListener1).not.toHaveBeenCalledWith("foo", "bar");
      expect(mockedEventListener2).not.toHaveBeenCalledWith("foo", "bar");
    });
  });

  describe("fireReadyEvent", () => {
    let mockedEventListener1: ReadyEventListener;
    let mockedEventListener2: ReadyEventListener;

    beforeEach(() => {
      mockedEventListener1 = jest.fn();
      mockedEventListener2 = jest.fn();

      eventManager.addEventListener(EVENT_TYPES.READY, mockedEventListener1);
      eventManager.addEventListener(EVENT_TYPES.READY, mockedEventListener2);
    });

    test("should trigger multiple listeners", () => {
      // when
      eventManager.fireReadyEvent();

      // then
      expect(mockedEventListener1).toHaveBeenCalled();
      expect(mockedEventListener2).toHaveBeenCalled();
    });

    test("after calling removeEventListener then should not trigger multiple listeners", () => {
      // given
      eventManager.removeEventListener(EVENT_TYPES.READY, mockedEventListener1);
      eventManager.removeEventListener(EVENT_TYPES.READY, mockedEventListener2);

      // when
      eventManager.fireReadyEvent();

      // then
      expect(mockedEventListener1).not.toHaveBeenCalled();
      expect(mockedEventListener2).not.toHaveBeenCalled();
    });
  });

  describe("fireStateChangeEvent", () => {
    let mockedEventListener1: StateChangeEventListener;
    let mockedEventListener2: StateChangeEventListener;

    beforeEach(() => {
      mockedEventListener1 = jest.fn();
      mockedEventListener2 = jest.fn();

      eventManager.addEventListener(
        EVENT_TYPES.STATE_CHANGE,
        mockedEventListener1,
      );
      eventManager.addEventListener(
        EVENT_TYPES.STATE_CHANGE,
        mockedEventListener2,
      );
    });

    test("should trigger multiple listeners", () => {
      // when
      eventManager.fireStateChangeEvent(STATES.HIDDEN);
      eventManager.fireStateChangeEvent(STATES.RESIZED);

      // then
      expect(mockedEventListener1).toHaveBeenNthCalledWith(1, STATES.HIDDEN);
      expect(mockedEventListener1).toHaveBeenNthCalledWith(2, STATES.RESIZED);
      expect(mockedEventListener2).toHaveBeenNthCalledWith(1, STATES.HIDDEN);
      expect(mockedEventListener2).toHaveBeenNthCalledWith(2, STATES.RESIZED);
    });

    test("after calling removeEventListener then should not trigger multiple listeners", () => {
      // given
      eventManager.removeEventListener(
        EVENT_TYPES.STATE_CHANGE,
        mockedEventListener1,
      );
      eventManager.removeEventListener(
        EVENT_TYPES.STATE_CHANGE,
        mockedEventListener2,
      );

      // when
      eventManager.fireStateChangeEvent(STATES.EXPANDED);

      // then
      expect(mockedEventListener1).not.toHaveBeenCalled();
      expect(mockedEventListener2).not.toHaveBeenCalled();
    });
  });

  describe("fireViewableChangeEvent", () => {
    let mockedEventListener1: ViewableChangeEventListener;
    let mockedEventListener2: ViewableChangeEventListener;

    beforeEach(() => {
      mockedEventListener1 = jest.fn();
      mockedEventListener2 = jest.fn();

      eventManager.addEventListener(
        EVENT_TYPES.VIEWABLE_CHANGE,
        mockedEventListener1,
      );
      eventManager.addEventListener(
        EVENT_TYPES.VIEWABLE_CHANGE,
        mockedEventListener2,
      );
    });

    test("should trigger multiple listeners", () => {
      // when
      eventManager.fireViewableChangeEvent(true);
      eventManager.fireViewableChangeEvent(false);

      // then
      expect(mockedEventListener1).toHaveBeenNthCalledWith(1, true);
      expect(mockedEventListener1).toHaveBeenNthCalledWith(2, false);
      expect(mockedEventListener2).toHaveBeenNthCalledWith(1, true);
      expect(mockedEventListener2).toHaveBeenNthCalledWith(2, false);
    });

    test("after calling removeEventListener then should not trigger multiple listeners", () => {
      // given
      eventManager.removeEventListener(
        EVENT_TYPES.VIEWABLE_CHANGE,
        mockedEventListener1,
      );
      eventManager.removeEventListener(
        EVENT_TYPES.VIEWABLE_CHANGE,
        mockedEventListener2,
      );

      // when
      eventManager.fireViewableChangeEvent(true);

      // then
      expect(mockedEventListener1).not.toHaveBeenCalled();
      expect(mockedEventListener2).not.toHaveBeenCalled();
    });
  });

  describe("fireSizeChangeEvent", () => {
    let mockedEventListener1: SizeChangeEventListener;
    let mockedEventListener2: SizeChangeEventListener;

    beforeEach(() => {
      mockedEventListener1 = jest.fn();
      mockedEventListener2 = jest.fn();

      eventManager.addEventListener(
        EVENT_TYPES.SIZE_CHANGE,
        mockedEventListener1,
      );
      eventManager.addEventListener(
        EVENT_TYPES.SIZE_CHANGE,
        mockedEventListener2,
      );
    });

    test("should trigger multiple listeners", () => {
      // when
      eventManager.fireSizeChangeEvent(320, 50);
      eventManager.fireSizeChangeEvent(300, 250);

      // then
      expect(mockedEventListener1).toHaveBeenNthCalledWith(1, 320, 50);
      expect(mockedEventListener1).toHaveBeenNthCalledWith(2, 300, 250);
      expect(mockedEventListener2).toHaveBeenNthCalledWith(1, 320, 50);
      expect(mockedEventListener2).toHaveBeenNthCalledWith(2, 300, 250);
    });

    test("after calling removeEventListener then should not trigger multiple listeners", () => {
      // given
      eventManager.removeEventListener(
        EVENT_TYPES.SIZE_CHANGE,
        mockedEventListener1,
      );
      eventManager.removeEventListener(
        EVENT_TYPES.SIZE_CHANGE,
        mockedEventListener2,
      );

      // when
      eventManager.fireSizeChangeEvent(320, 100);

      // then
      expect(mockedEventListener1).not.toHaveBeenCalled();
      expect(mockedEventListener2).not.toHaveBeenCalled();
    });
  });

  test("fireExposureChangeEvent then should trigger multiple listeners", () => {
    // given
    const mockedEventListener1 = jest.fn();
    const mockedEventListener2 = jest.fn();

    eventManager.addEventListener(
      EVENT_TYPES.EXPOSURE_CHANGE,
      mockedEventListener1,
    );
    eventManager.addEventListener(
      EVENT_TYPES.EXPOSURE_CHANGE,
      mockedEventListener2,
    );

    // when
    eventManager.fireExposureChangeEvent(30, {
      width: 100,
      height: 150,
      x: 10,
      y: 20,
    });

    // then
    expect(mockedEventListener1).toHaveBeenCalledWith(
      30,
      {
        width: 100,
        height: 150,
        x: 10,
        y: 20,
      },
      undefined,
    );
    expect(mockedEventListener2).toHaveBeenCalledWith(
      30,
      {
        width: 100,
        height: 150,
        x: 10,
        y: 20,
      },
      undefined,
    );
  });

  test("fireAudioVolumeChangeEvent then should trigger multiple listeners", () => {
    // given
    const mockedEventListener1 = jest.fn();
    const mockedEventListener2 = jest.fn();

    eventManager.addEventListener(
      EVENT_TYPES.AUDIO_VOLUME_CHANGE,
      mockedEventListener1,
    );
    eventManager.addEventListener(
      EVENT_TYPES.AUDIO_VOLUME_CHANGE,
      mockedEventListener2,
    );

    // when
    eventManager.fireAudioVolumeChangeEvent(0);
    eventManager.fireAudioVolumeChangeEvent(50);

    // then
    expect(mockedEventListener1).toHaveBeenNthCalledWith(1, 0);
    expect(mockedEventListener1).toHaveBeenNthCalledWith(2, 50);
    expect(mockedEventListener2).toHaveBeenNthCalledWith(1, 0);
    expect(mockedEventListener2).toHaveBeenNthCalledWith(2, 50);
  });
});
