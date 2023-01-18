import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { ItemSubType } from "../models/mod.ts";
import { GameAction } from "./common.ts";

export class SellCancellation extends GameAction {
  protected readonly type_id: string = "sell_cancellation9";

  sellerAvatarAddress: Address;
  tradableId: Uint8Array;
  orderId: Uint8Array;
  itemSubType: ItemSubType;

  constructor(
    { sellerAvatarAddress, tradableId, orderId, itemSubType, id }: {
      sellerAvatarAddress: Address;
      tradableId: Uint8Array;
      orderId: Uint8Array;
      itemSubType: ItemSubType;
      id?: Uint8Array;
    },
  ) {
    super(id);

    this.sellerAvatarAddress = sellerAvatarAddress;
    this.tradableId = tradableId;
    this.orderId = orderId;
    this.itemSubType = itemSubType;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "sva": this.sellerAvatarAddress[toBencodex](),
      "ti": this.tradableId,
      "pi": this.orderId,
      "ist": this.itemSubType,
    };
  }
}
