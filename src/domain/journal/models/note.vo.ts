import { ValueObject } from "../../core/entities/value-object";

export class Note extends ValueObject {
  constructor(contents: string) {
    super();
    this._contents = contents;
  }

  /**
   * contents.
   */
  private _contents: string;
  public get contents(): string {
    return this._contents;
  }
}
