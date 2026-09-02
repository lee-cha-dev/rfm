/**
 * Describes the immutable public asset paths and intrinsic dimensions copied
 * from the POC. Interfaces use this manifest to avoid duplicated paths and to
 * reserve stable image space before files finish loading.
 *
 * @type {Readonly<Record<string, Readonly<Record<string, Readonly<{src: string, width: number, height: number}>>>>>>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
const PUBLIC_BASE_URL = import.meta.env.BASE_URL

export const ASSETS = Object.freeze({
  logos: Object.freeze({
    header: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/logos/ros-family-medicine-logo-header.png`,
      width: 1637,
      height: 807,
    }),
    primary: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/logos/ros-family-medicine-logo.png`,
      width: 1637,
      height: 807,
    }),
  }),
  photos: Object.freeze({
    coveredEntrance: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/photos/clinic-covered-entrance.jpg`,
      width: 600,
      height: 450,
    }),
    clinicFront: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/photos/clinic-front.jpg`,
      width: 800,
      height: 588,
    }),
    reception: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/photos/clinic-reception.jpg`,
      width: 1600,
      height: 900,
    }),
    waitingRoom: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/photos/clinic-waiting-room.jpg`,
      width: 1800,
      height: 1201,
    }),
    familyCare: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/photos/family-care.jpg`,
      width: 1800,
      height: 1200,
    }),
    roHenry: Object.freeze({
      src: `${PUBLIC_BASE_URL}assets/photos/providers/ro_henry_aprn.jpeg`,
      width: 3024,
      height: 4032,
    }),
  }),
})
