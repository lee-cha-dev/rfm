import { ASSETS } from './assets.js'

/**
 * Practice roster rendered by the dedicated About page. Keeping the biography
 * and image choice together makes future hires a data-only update while the
 * section component owns the alternating presentation.
 *
 * @type {ReadonlyArray<Readonly<{
 *   id: string,
 *   name: string,
 *   role: string,
 *   photo: Readonly<{src: string, width: number, height: number}>,
 *   photoAlt: string,
 *   biography: readonly string[],
 * }>>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export const EMPLOYEES = Object.freeze([
  Object.freeze({
    id: 'ro-henry',
    name: 'Ro Henry, APRN',
    role: 'Advanced Practice Registered Nurse',
    photo: ASSETS.photos.roHenry,
    photoAlt: 'Ro Henry smiling with a chicken perched on her shoulder',
    biography: Object.freeze([
      'Ro Henry is the provider behind Ro\u2019s Family Medicine. She listens before reaching for an answer, explains what she sees in plain language, and leaves room for the details that can change a visit.',
      'The bright red scrubs and the chicken on her shoulder probably tell you something useful about Ro, too. She brings warmth and a sense of humor into the room. A medical visit can still feel human.',
    ]),
  }),
  Object.freeze({
    id: 'ro-henry',
    name: 'Ro Henry, APRN',
    role: 'Advanced Practice Registered Nurse',
    photo: ASSETS.photos.roHenry,
    photoAlt: 'Ro Henry smiling with a chicken perched on her shoulder',
    biography: Object.freeze([
      'Ro Henry is the provider behind Ro\u2019s Family Medicine. She listens before reaching for an answer, explains what she sees in plain language, and leaves room for the details that can change a visit.',
      'The bright red scrubs and the chicken on her shoulder probably tell you something useful about Ro, too. She brings warmth and a sense of humor into the room. A medical visit can still feel human.',
    ]),
  }),
])
