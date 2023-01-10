import {
  Encodable,
  EncodableArray,
  EncodableObject,
  encode,
} from "https://esm.sh/bencodex@0.1.2";
import { decode } from "https://deno.land/std@0.171.0/encoding/hex.ts";

type Address = Uint8Array;

abstract class PolymorphicAction {
  serialize(): Buffer {
    return encode({
      type_id: this.type_id,
      values: this.plain_value(),
    });
  }

  protected abstract get type_id(): string;

  protected abstract plain_value(): Encodable;
}

abstract class GameAction extends PolymorphicAction {
  id: Uint8Array;

  constructor(id: Uint8Array | undefined) {
    super();

    if (id !== undefined && id.length !== 16) {
      throw new RangeError("'id' must be 16-length.");
    }

    this.id = id || new Uint8Array(16);
  }

  protected override plain_value(): Encodable {
    return {
      id: this.id,
      ...this.plain_value_internal(),
    };
  }

  protected abstract plain_value_internal(): EncodableObject;
}

export class Stake extends GameAction {
  amount: bigint;

  constructor({ amount, id }: {
    amount: bigint;
    id?: Uint8Array;
  }) {
    super(id);

    this.amount = amount;
  }

  protected get type_id(): string {
    return "stake2";
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "am": this.amount,
    };
  }
}

export class ClaimStakeReward extends GameAction {
  avatarAddress: Uint8Array;

  constructor({ avatarAddress, id }: {
    avatarAddress: string | Uint8Array;
    id?: Uint8Array;
  }) {
    super(id);

    if (typeof avatarAddress === "string") {
      this.avatarAddress = toAddress(avatarAddress);

      if (this.avatarAddress.length !== 20) {
        throw new RangeError("Address' length must be 20-bytes.");
      }
    } else {
      this.avatarAddress = avatarAddress;
    }
  }

  protected get type_id(): string {
    return "claim_stake_reward3";
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "aa": this.avatarAddress,
    };
  }
}

class Currency {
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
      "minters": this.minters,
      "decimalPlaces": this.decimalPlaces,
    };
  }
}

class FungibleAssetValue {
  currency: Currency;
  quantity: bigint;

  constructor(
    { currency, quantity }: { currency: Currency; quantity: bigint | number },
  ) {
    this.currency = currency;
    this.quantity = BigInt(quantity);
  }

  asBencodex(): EncodableArray {
    return [
      this.currency.asBencodex(),
      this.quantity,
    ];
  }
}

export class TransferAsset extends PolymorphicAction {
  sender: Uint8Array;
  recipient: Uint8Array;
  amount: FungibleAssetValue;
  memo: string | undefined;

  constructor({ sender, recipient, amount, memo }: {
    sender: string | Uint8Array;
    recipient: string | Uint8Array;
    amount: FungibleAssetValue;
    memo?: string;
  }) {
    super();

    if (typeof sender === "string") {
      this.sender = toAddress(sender);

      if (this.sender.length !== 20) {
        throw new RangeError("Address' length must be 20-bytes.");
      }
    } else {
      this.sender = sender;
    }

    if (typeof recipient === "string") {
      this.recipient = toAddress(recipient);

      if (this.recipient.length !== 20) {
        throw new RangeError("Address' length must be 20-bytes.");
      }
    } else {
      this.recipient = recipient;
    }

    this.amount = amount;
    this.memo = memo;
  }

  protected get type_id(): string {
    return "claim_stake_reward3";
  }

  protected plain_value(): Encodable {
    return {
      "sender": this.sender,
      "recipient": this.recipient,
      "amount": this.amount.asBencodex(),
      ...(this.memo !== undefined ? { "memo": this.memo } : {}),
    };
  }
}

function toAddress(address: string): Address {
  return decode(new TextEncoder().encode(address.replace("0x", "")));
}

export const NCG = new Currency({
  ticker: "NCG",
  decimalPlaces: 2,
  minters: [toAddress("0x47d082a115c63e7b58b1532d20e631538eafadde")],
});
