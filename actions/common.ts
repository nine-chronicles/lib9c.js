import {
  Encodable,
  EncodableObject,
  encode,
} from "https://esm.sh/v102/bencodex@0.1.2/lib/index";

export abstract class PolymorphicAction {
  serialize(): Buffer {
    return encode({
      type_id: this.type_id,
      values: this.plain_value(),
    });
  }

  protected abstract readonly type_id: string;

  protected abstract plain_value(): Encodable;
}

export abstract class GameAction extends PolymorphicAction {
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
