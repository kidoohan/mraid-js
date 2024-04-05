import { isBoolean } from "./validate";

/**
 * A class describing the device supported features.
 */
export class DeviceFeatures {
  /**
   * Whether the devices support using the sms: protocol to send an SMS message.
   */
  sms: boolean;

  /**
   * Whether the devices support initiating calls using the tel: protocol.
   */
  tel: boolean;

  /**
   * Whether the device can create a calendar entry.
   */
  calendar: boolean;

  /**
   * Whether the device support the MRAID storePicture method.
   */
  storePicture: boolean;

  /**
   * Whether the device can play HTML5 video files
   */
  inlineVideo: boolean;

  /**
   * Whether the device container supports VPAID handshake with ad to communicate VPAID events.
   */
  vpaid: boolean;

  /**
   * Whether the device supports access to GPS coordinates.
   */
  location: boolean;

  constructor(
    sms: boolean,
    tel: boolean,
    calendar: boolean,
    storePicture: boolean,
    inlineVideo: boolean,
    vpaid: boolean,
    location: boolean,
  ) {
    this.sms = sms;
    this.tel = tel;
    this.calendar = calendar;
    this.storePicture = storePicture;
    this.inlineVideo = inlineVideo;
    this.vpaid = vpaid;
    this.location = location;
  }

  update(supportedFeatures: unknown) {
    const maybeSupportedFeatures = supportedFeatures as
      | DeviceFeatures
      | undefined;
    const maybeSms = maybeSupportedFeatures?.sms;
    const maybeTel = maybeSupportedFeatures?.tel;
    const maybeStorePicture = maybeSupportedFeatures?.storePicture;
    const maybeInlineVideo = maybeSupportedFeatures?.inlineVideo;
    const maybeVpaid = maybeSupportedFeatures?.vpaid;
    const maybeLocation = maybeSupportedFeatures?.location;

    if (isBoolean(maybeSms)) {
      this.sms = maybeSms;
    }
    if (isBoolean(maybeTel)) {
      this.tel = maybeTel;
    }
    if (isBoolean(maybeStorePicture)) {
      this.storePicture = maybeStorePicture;
    }
    if (isBoolean(maybeInlineVideo)) {
      this.inlineVideo = maybeInlineVideo;
    }
    if (isBoolean(maybeVpaid)) {
      this.vpaid = maybeVpaid;
    }
    if (isBoolean(maybeLocation)) {
      this.location = maybeLocation;
    }
  }
}
