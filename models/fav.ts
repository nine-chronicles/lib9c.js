import { EncodableArray } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Bencodexable, toBencodex } from "./bencodexable.ts";
import { Currency } from "./currency.ts";

export class FungibleAssetValue implements Bencodexable {
  currency: Currency;
  quantity: bigint;

  constructor(
    { currency, quantity }: { currency: Currency; quantity: bigint | number },
  ) {
    this.currency = currency;
    this.quantity = BigInt(quantity);
  }

  [toBencodex](): EncodableArray {
    return [
      this.currency.asBencodex(),
      this.quantity,
    ];
  }
}
