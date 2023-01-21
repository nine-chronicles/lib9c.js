import {
  BencodexValue,
  EncodableArray,
} from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Bencodexable, toBencodex } from "./mod.ts";

export class RuneSlotInfo implements Bencodexable {
  slotIndex: bigint;
  runeId: bigint;

  constructor({ slotIndex, runeId }: {
    slotIndex: bigint;
    runeId: bigint;
  }) {
    this.slotIndex = slotIndex;
    this.runeId = runeId;
  }

  [toBencodex](): EncodableArray {
    return [this.slotIndex.toString(), this.runeId.toString()];
  }

  static fromBencodex(value: BencodexValue): RuneSlotInfo {
    if (!(value instanceof Array)) {
      throw TypeError("RuneSlotInfo.fromBencodex() receives only array.");
    }

    if (typeof value[0] !== "string") {
      throw new TypeError(
        "RuneSlotInfo's first element should be `string` type.",
      );
    }

    if (typeof value[1] !== "string") {
      throw new TypeError(
        "RuneSlotInfo's second element should be `string` type.",
      );
    }

    const slotIndex = BigInt(value[0]);
    const runeId = BigInt(value[1]);

    return new RuneSlotInfo({
      slotIndex,
      runeId,
    });
  }
}
