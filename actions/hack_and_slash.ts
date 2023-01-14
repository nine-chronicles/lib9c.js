import {
  EncodableArray,
  EncodableObject,
} from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { Bencodexable, toBencodex } from "../models/bencodexable.ts";
import { GameAction } from "./common.ts";

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

export class HackAndSlash extends GameAction {
  protected readonly type_id: string = "hack_and_slash19";

  costumes: Uint8Array[];
  equipments: Uint8Array[];
  foods: Uint8Array[];
  worldId: bigint;
  stageId: bigint;
  stageBuffId: Uint8Array | undefined;
  avatarAddress: Address;
  playCount: bigint;
  runeInfos: RuneSlotInfo[];

  constructor(
    {
      costumes,
      equipments,
      foods,
      worldId,
      stageId,
      avatarAddress,
      runeInfos,
      stageBuffId,
      id,
      playCount,
    }: {
      costumes: Uint8Array[];
      equipments: Uint8Array[];
      foods: Uint8Array[];
      worldId: bigint;
      stageId: bigint;
      avatarAddress: Address;
      runeInfos: RuneSlotInfo[];
      stageBuffId?: Uint8Array;
      id?: Uint8Array;
      playCount?: bigint;
    },
  ) {
    super(id);

    this.costumes = costumes;
    this.equipments = equipments;
    this.foods = foods;
    this.worldId = worldId;
    this.stageId = stageId;
    this.avatarAddress = avatarAddress;
    this.runeInfos = runeInfos;
    this.stageBuffId = stageBuffId;
    this.playCount = playCount || 1n;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "costumes": this.costumes,
      "equipments": this.equipments,
      "foods": this.foods,
      "worldId": this.worldId.toString(),
      "stageId": this.stageId.toString(),
      "avatarAddress": this.avatarAddress[toBencodex](),
      "playCount": this.avatarAddress[toBencodex](),
      "r": this.runeInfos.map((x) => x[toBencodex]()),
      ...(this.stageBuffId !== undefined
        ? { "stageBuffId": this.stageBuffId }
        : {}),
    };
  }
}
