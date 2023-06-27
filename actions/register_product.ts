import { Encodable, EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { Bencodexable, toBencodex } from "../models/bencodexable.ts";
import { FungibleAssetValue } from "../models/fav.ts";
import { GameAction } from "./common.ts";

// deno-lint-ignore no-empty-interface
interface IRegisterInfo extends Bencodexable {}

export class AssetInfo implements IRegisterInfo {
  readonly avatarAddress: Address;
  readonly price: FungibleAssetValue;
  readonly asset: FungibleAssetValue;

  constructor({
    avatarAddress,
    price,
    asset,
  }: {
    avatarAddress: Address;
    price: FungibleAssetValue;
    asset: FungibleAssetValue;
  }) {
    this.avatarAddress = avatarAddress;
    this.price = price;
    this.asset = asset;
  }

  [toBencodex](): Encodable {
    return [
      this.avatarAddress[toBencodex](),
      this.price[toBencodex](),
      "FungibleAssetValue",
      this.asset[toBencodex](),
    ]
  }
}

export class RegisterInfo implements IRegisterInfo {
  readonly avatarAddress: Address;
  readonly price: FungibleAssetValue;
  readonly tradableId: Uint8Array;
  readonly itemCount: number;
  readonly type: "Fungible" | "NonFungible";

  constructor({
    avatarAddress,
    price,
    tradableId,
    itemCount,
    type,
  }: {
    avatarAddress: Address;
    price: FungibleAssetValue;
    tradableId: Uint8Array;
    itemCount: number;
    type: "Fungible" | "NonFungible";
  }) {
    this.avatarAddress = avatarAddress;
    this.price = price;
    this.tradableId = tradableId;
    this.itemCount = itemCount;
    this.type = type;
  }

  [toBencodex](): Encodable {
    return [
      this.avatarAddress[toBencodex](),
      this.price[toBencodex](),
      this.type,
      this.tradableId,
      this.itemCount,
    ]
  }
}

export class RegisterProduct extends GameAction {
  protected readonly type_id: string = "register_product2";

  readonly registerInfos: IRegisterInfo[];
  readonly avatarAddress: Address;
  readonly chargeAp: boolean;

  constructor({ registerInfos, avatarAddress, chargeAp, id }: {
    registerInfos: IRegisterInfo[];
    avatarAddress: Address;
    chargeAp: boolean;
    id?: Uint8Array;
  }) {
    super(id);

    this.registerInfos = registerInfos;
    this.avatarAddress = avatarAddress;

    this.chargeAp = chargeAp;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "r": this.registerInfos.map(r => r[toBencodex]()),
      "a": this.avatarAddress[toBencodex](),
      "c": this.chargeAp,
    };
  }
}
