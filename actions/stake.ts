import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { GameAction } from "./common.ts";

export class Stake extends GameAction {
  protected readonly type_id: string = "stake3";

  amount: bigint;

  constructor({ amount, id }: {
    amount: bigint;
    id?: Uint8Array;
  }) {
    super(id);

    this.amount = amount;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "am": this.amount,
    };
  }
}
