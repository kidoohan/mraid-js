import { instance, mock, verify } from "ts-mockito";
import { AndroidBridge, AdsJsInterface } from "../../src/bridge/android-bridge";
import {
  LOG_LEVELS,
  ORIENTATION_TYPES,
  CLOSE_POSITION_TYPES,
} from "../../src/constants";

let androidBridge: AndroidBridge;
let adsJsInterface: AdsJsInterface;

describe("AndroidBridge", () => {
  beforeEach(() => {
    androidBridge = new AndroidBridge();
    adsJsInterface = mock<AdsJsInterface>();
    window.adsJsInterface = instance(adsJsInterface);
  });

  test("log, should delegate to adsJsInterface on window", () => {
    // given
    const logLevel = LOG_LEVELS.WARNING;
    const message = "foo";

    // when
    androidBridge.log(logLevel, message);

    // then
    verify(adsJsInterface.log(logLevel, message)).once();
  });

  test("open, should delegate to adsJsInterface on window", () => {
    // given
    const uri = "https://www.naver.com";

    // when
    androidBridge.open(uri);

    // then
    verify(adsJsInterface.open(uri)).once();
  });

  test("close, should delegate to adsJsInterface on window", () => {
    // when
    androidBridge.close();

    // then
    verify(adsJsInterface.close()).once();
  });

  test("useCustomClose, should delegate to adsJsInterface on window", () => {
    // when
    androidBridge.useCustomClose(false);

    // then
    verify(adsJsInterface.useCustomClose(false)).once();
  });

  test("unload, should delegate to adsJsInterface on window", () => {
    // when
    androidBridge.unload();

    // then
    verify(adsJsInterface.unload()).once();
  });

  test("resize, should delegate to adsJsInterface on window", () => {
    // given
    const width = 320;
    const height = 100;
    const offsetX = -50;
    const offsetY = 50;
    const customClosePosition = CLOSE_POSITION_TYPES.TOP_RIGHT;
    const allowOffscreen = true;

    // when
    androidBridge.resize(
      width,
      height,
      offsetX,
      offsetY,
      customClosePosition,
      allowOffscreen,
    );

    // then
    verify(
      adsJsInterface.resize(
        width,
        height,
        offsetX,
        offsetY,
        customClosePosition,
        allowOffscreen,
      ),
    ).once();
  });

  test("expand, should delegate to adsJsInterface on window", () => {
    // given
    const width = 300;
    const height = 250;
    const useCustomClose = false;
    const isModal = true;
    const uri = "https://www.naver.com";

    // when
    androidBridge.expand(width, height, useCustomClose, isModal, uri);

    // then
    verify(
      adsJsInterface.expand(width, height, useCustomClose, isModal, uri),
    ).once();
  });

  test("setOrientationProperties, should delegate to adsJsInterface on window", () => {
    // given
    const allowOrientationChange = true;
    const forceOrientation = ORIENTATION_TYPES.PORTRAIT;

    // when
    androidBridge.setOrientationProperties(
      allowOrientationChange,
      forceOrientation,
    );

    verify(
      adsJsInterface.setOrientationProperties(
        allowOrientationChange,
        forceOrientation,
      ),
    ).once();
  });

  test("playVideo, should delegate to adsJsInterface on window", () => {
    // given
    const uri = "https://www.naver.com/foo.mp4";

    // when
    androidBridge.playVideo(uri);

    // then
    verify(adsJsInterface.playVideo(uri)).once();
  });

  test("storePicture, should delegate to adsJsInterface on window", () => {
    // given
    const uri = "https://www.naver.com/foo.png";

    // when
    androidBridge.storePicture(uri);

    // then
    verify(adsJsInterface.storePicture(uri)).once();
  });
});
