import { ValueObject } from "../../core/entities/value-object";

export class Appointment extends ValueObject {
  private _desc: string;
  private _time: Date;

  constructor(desc: string, time: Date) {
    super();
    this._desc = desc;
    this._time = time;
  }

  get desc(): string {
    return this._desc;
  }

  get time(): Date {
    return this._time;
  }
}
