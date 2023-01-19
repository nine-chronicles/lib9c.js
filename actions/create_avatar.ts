import { EncodableObject } from "https://esm.sh/v102/bencodex@0.1.2/lib/index";
import { GameAction } from "./common.ts";

export class CreateAvatar extends GameAction {
  protected readonly type_id: string = "create_avatar8";

  index: bigint;
  hair: bigint;
  lens: bigint;
  ear: bigint;
  tail: bigint;
  name: string;

  constructor(
    { index, hair, lens, ear, tail, name, id }: {
      index: bigint;
      hair: bigint;
      lens: bigint;
      ear: bigint;
      tail: bigint;
      name: string;
      id?: Uint8Array;
    },
  ) {
    super(id);

    this.index = index;
    this.hair = hair;
    this.lens = lens;
    this.ear = ear;
    this.tail = tail;
    this.name = name;
  }

  protected plain_value_internal(): EncodableObject {
    return {
      "index": this.index,
      "hair": this.hair,
      "lens": this.lens,
      "ear": this.ear,
      "tail": this.tail,
      "name": this.name,
    };
  }
}
