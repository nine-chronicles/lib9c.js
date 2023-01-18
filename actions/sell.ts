import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { FungibleAssetValue } from "../models/fav.ts";
import { ItemSubType } from "../models/mod.ts";
import { GameAction } from "./common.ts";

export class Sell extends GameAction {
  protected readonly type_id: string = "sell11";

  sellerAvatarAddress: Address;
  tradableId: Uint8Array;
  orderId: Uint8Array;
  count: bigint;
  price: FungibleAssetValue;
  itemSubType: ItemSubType;

  constructor(
    { sellerAvatarAddress, tradableId, orderId, count, price, itemSubType, id }:
      {
        sellerAvatarAddress: Address;
        tradableId: Uint8Array;
        orderId: Uint8Array;
        count: bigint;
        price: FungibleAssetValue;
        itemSubType: ItemSubType;
        id?: Uint8Array;
      },
  ) {
    super(id);

    this.sellerAvatarAddress = sellerAvatarAddress;
    this.tradableId = tradableId;
    this.orderId = orderId;
    this.count = count;
    this.price = price;
    this.itemSubType = itemSubType;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "sva": this.sellerAvatarAddress[toBencodex](),
      "ii": this.tradableId,
      "oi": this.orderId,
      "ist": this.itemSubType,
      "p": this.price[toBencodex](),
      "item_count": this.count,
    };
  }
}
