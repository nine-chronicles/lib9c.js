import { Encodable } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { FungibleAssetValue } from "../models/fav.ts";
import { PolymorphicAction } from "./common.ts";

export class TransferAssets extends PolymorphicAction {
  protected readonly type_id: string = "transfer_assets";

  sender: Address;
  recipients: [Address, FungibleAssetValue][];
  memo: string | undefined;

  constructor({ sender, recipients, memo }: {
    sender: Address;
    recipients: [Address, FungibleAssetValue][];
    memo?: string;
  }) {
    super();

    this.sender = sender;
    this.recipients = recipients;
    this.memo = memo;
  }

  protected plain_value(): Encodable {
    return {
      "sender": this.sender[toBencodex](),
      "recipients": this.recipients.map((xs) => xs.map((x) => x[toBencodex]())),
      ...(this.memo !== undefined ? { "memo": this.memo } : {}),
    };
  }
}
