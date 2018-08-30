import { ValueObject } from "../entities/value-object";

/**
 * DomainEvent
 */
export class DomainEvent extends ValueObject {
  constructor(private _data: any) {
    super();

    this._date = new Date();
  }

  /**
   * date
   */
  private _date: Date;
  public get date(): Date {
    return this._date;
  }

  /**
   * data
   */
  public get data(): any {
    return this._data;
  }
}
