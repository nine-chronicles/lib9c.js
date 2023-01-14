import { Encodable } from "https://esm.sh/bencodex@0.1.2";

export const toBencodex = Symbol.for("toBencodex");

export interface Bencodexable {
  [toBencodex](): Encodable;
}
