import { ValueObject } from "../../common/components/ValueObject";

export class Tracker extends ValueObject {
  constructor(desc: string) {
    super();
    this._desc = desc;
    this._values = [];
  }

  /**
   * Description.
   */
  private _desc: string;
  public get desc(): string {
    return this._desc;
  }

  /**
   * Values.
   */
  private _values: TrackerValue[];
  public get values(): TrackerValue[] {
    return this._values;
  }
}
