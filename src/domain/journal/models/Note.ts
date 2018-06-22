import { ValueObject } from "../../common/components/ValueObject";

export class Note extends ValueObject {
  private _contents: string;

  constructor(contents: string) {
    super();
    this._contents = contents;
  }

  get contents(): string {
    return this._contents;
  }
}
