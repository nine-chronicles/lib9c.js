import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { GameAction } from "./common.ts";

export class ClaimStakeReward extends GameAction {
  protected readonly type_id: string = "claim_stake_reward3";

  avatarAddress: Address;

  constructor({ avatarAddress, id }: {
    avatarAddress: Address;
    id?: Uint8Array;
  }) {
    super(id);

    this.avatarAddress = avatarAddress;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "aa": this.avatarAddress[toBencodex](),
    };
  }
}
