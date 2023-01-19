import { EncodableArray } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
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
}
