import { Encodable } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "../models/address.ts";
import { toBencodex } from "../models/bencodexable.ts";
import { PolymorphicAction } from "./common.ts";

export class ActivateAccount extends PolymorphicAction {
  protected readonly type_id: string = "activate_account2";

  pendingAddress: Address;
  signature: Uint8Array;

  constructor({ pendingAddress, signature }: {
    pendingAddress: Address;
    signature: Uint8Array;
  }) {
    super();

    this.pendingAddress = pendingAddress;
    this.signature = signature;
  }

  protected plain_value(): Encodable {
    return {
      "pa": this.pendingAddress[toBencodex](),
      "s": this.signature,
    };
  }
}
