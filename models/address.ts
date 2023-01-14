import { Encodable } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Bencodexable, toBencodex } from "./bencodexable.ts";
import { decode } from "https://deno.land/std@0.171.0/encoding/hex.ts";

export class Address implements Bencodexable {
  private readonly value: Uint8Array;
  constructor(value: string | Uint8Array) {
    if (typeof value === "string") {
      this.value = decode(new TextEncoder().encode(value.replace("0x", "")));
    } else {
      this.value = value;
    }

    if (this.value.length !== 20) {
      throw new RangeError("Address' length must be 20-bytes.");
    }
  }

  [toBencodex](): Encodable {
    return this.value;
  }
}
