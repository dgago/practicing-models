import { ValueObject } from "../../../../core/entities/value-object";

/**
 * DocumentUpdateCheck
 */
export class DocumentUpdateCheck extends ValueObject {
  constructor(date: Date, comments: string) {
    super();

    this._date = date;
    this._comments = comments;
  }

  /**
   * date
   */
  private _date: Date;
  public get date(): Date {
    return this._date;
  }

  /**
   * comments
   */
  private _comments: string;
  public get comments(): string {
    return this._comments;
  }
}
