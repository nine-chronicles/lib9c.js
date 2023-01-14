import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { Address } from "./address.ts";
import { toBencodex } from "./bencodexable.ts";

export class Currency {
  ticker: string;
  decimalPlaces: bigint;
  minters: Address[];

  constructor({ ticker, decimalPlaces, minters }: {
    ticker: string;
    decimalPlaces: number | bigint;
    minters: Address[];
  }) {
    // FIXME: validate minters duplication.
    // FIXME: validate decimalPlaces is in valid 'byte' range.

    this.ticker = ticker;
    this.decimalPlaces = BigInt(decimalPlaces);
    this.minters = minters;
  }

  asBencodex(): EncodableObject {
    return {
      "ticker": this.ticker,
      "minters": this.minters.map((x) => x[toBencodex]()),
      "decimalPlaces": this.decimalPlaces,
    };
  }
}

export const NCG = new Currency({
  ticker: "NCG",
  decimalPlaces: 2,
  minters: [new Address("0x47d082a115c63e7b58b1532d20e631538eafadde")],
});
