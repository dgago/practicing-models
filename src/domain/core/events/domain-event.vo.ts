import { ValueObject } from "../entities/value-object";

/**
 * DomainEvent
 */
export class DomainEvent extends ValueObject {
  constructor(data: any) {
    super();

    this._data = data;
  }

  /**
   * version
   */
  private _version: number;
  public get version(): number {
    return this._version;
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
  private _data: any;
  public get data(): any {
    return this._data;
  }
}
