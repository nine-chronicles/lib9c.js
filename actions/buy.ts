import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { Bencodexable, toBencodex } from "../models/bencodexable.ts";
import { FungibleAssetValue } from "../models/fav.ts";
import { ItemSubType } from "../models/mod.ts";
import { GameAction } from "./common.ts";

export class PurchaseInfo implements Bencodexable {
  orderId: Uint8Array;
  tradableId: Uint8Array;
  sellerAgentAddress: Address;
  sellerAvatarAddress: Address;
  itemSubType: ItemSubType;
  price: FungibleAssetValue;

  constructor(
    {
      orderId,
      tradableId,
      sellerAgentAddress,
      sellerAvatarAddress,
      itemSubType,
      price,
    }: {
      orderId: Uint8Array;
      tradableId: Uint8Array;
      sellerAgentAddress: Address;
      sellerAvatarAddress: Address;
      itemSubType: ItemSubType;
      price: FungibleAssetValue;
    },
  ) {
    this.orderId = orderId;
    this.tradableId = tradableId;
    this.sellerAgentAddress = sellerAgentAddress;
    this.sellerAvatarAddress = sellerAvatarAddress;
    this.itemSubType = itemSubType;
    this.price = price;
  }

  [toBencodex](): EncodableObject {
    return {
      "oi": this.orderId,
      "ti": this.tradableId,
      "sva": this.sellerAvatarAddress[toBencodex](),
      "sga": this.sellerAgentAddress[toBencodex](),
      "ist": this.itemSubType,
      "p": this.price[toBencodex](),
    };
  }
}

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

export class Buy extends GameAction {
  protected readonly type_id: string = "buy12";

  buyerAvatarAddress: Address;
  purchaseInfos: PurchaseInfo[];

  constructor({ buyerAvatarAddress, purchaseInfos, id }: {
    buyerAvatarAddress: Address;
    purchaseInfos: PurchaseInfo[];
    id?: Uint8Array;
  }) {
    super(id);

    this.buyerAvatarAddress = buyerAvatarAddress;
    this.purchaseInfos = purchaseInfos;

    this.purchaseInfos.sort((a, b) => compareUint8Array(a.orderId, b.orderId));
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "ba": this.buyerAvatarAddress[toBencodex](),
      "pis": this.purchaseInfos.map((x) => x[toBencodex]()),
    };
  }
}
