import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { GameAction } from "./common.ts";
import { RuneSlotInfo } from "../models/mod.ts";

function compareUint8Array(a: Uint8Array, b: Uint8Array): number {
  const maxLength = Math.max(a.length, b.length);
  const compA: number[] = [...Array(maxLength - a.length).fill(0), ...a];
  const compB: number[] = [...Array(maxLength - b.length).fill(0), ...b];
  for (let i = 0; i < maxLength; ++i) {
    if (compA[i] > compB[i]) {
      return -1;
    } else if (compA[i] < compB[i]) {
      return 1;
    }
  }

  return 0;
}

export class BattleArena extends GameAction {
  protected readonly type_id: string = "battle_arena7";

  myAvatarAddress: Address;
  enemyAvatarAddress: Address;
  championshipId: bigint;
  round: bigint;
  ticket: bigint;
  costumes: Uint8Array[];
  equipments: Uint8Array[];
  runeSlotInfos: RuneSlotInfo[];

  constructor(
    {
      myAvatarAddress,
      enemyAvatarAddress,
      championshipId,
      round,
      ticket,
      costumes,
      equipments,
      runeSlotInfos,
      id,
    }: {
      myAvatarAddress: Address;
      enemyAvatarAddress: Address;
      championshipId: bigint;
      round: bigint;
      ticket: bigint;
      costumes: Uint8Array[];
      equipments: Uint8Array[];
      runeSlotInfos: RuneSlotInfo[];
      id?: Uint8Array;
    },
  ) {
    super(id);

    this.myAvatarAddress = myAvatarAddress;
    this.enemyAvatarAddress = enemyAvatarAddress;
    this.championshipId = championshipId;
    this.round = round;
    this.ticket = ticket;
    this.costumes = costumes;
    this.equipments = equipments;
    this.runeSlotInfos = runeSlotInfos;

    this.costumes.sort((a, b) => compareUint8Array(a, b));
    this.equipments.sort((a, b) => compareUint8Array(a, b));
    this.runeSlotInfos.sort((a, b) => Number(a.slotIndex - b.slotIndex));
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "maa": this.myAvatarAddress[toBencodex](),
      "eaa": this.enemyAvatarAddress[toBencodex](),
      "chi": this.championshipId,
      "rd": this.round,
      "tk": this.ticket,
      "cs": this.costumes,
      "es": this.equipments,
      "ri": this.runeSlotInfos.map((x) => x[toBencodex]()),
    };
  }
}
