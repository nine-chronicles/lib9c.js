import { Encodable } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { FungibleAssetValue } from "../models/fav.ts";
import { PolymorphicAction } from "./common.ts";

export class TransferAsset extends PolymorphicAction {
  protected readonly type_id: string = "transfer_asset3";

  sender: Address;
  recipient: Address;
  amount: FungibleAssetValue;
  memo: string | undefined;

  constructor({ sender, recipient, amount, memo }: {
    sender: Address;
    recipient: Address;
    amount: FungibleAssetValue;
    memo?: string;
  }) {
    super();

    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.memo = memo;
  }

  protected plain_value(): Encodable {
    return {
      "sender": this.sender[toBencodex](),
      "recipient": this.recipient[toBencodex](),
      "amount": this.amount.asBencodex(),
      ...(this.memo !== undefined ? { "memo": this.memo } : {}),
    };
  }
}
