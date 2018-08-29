import { ValueObject } from "../../../../core/entities/value-object";

/**
 * DocumentEvent
 */
export class DocumentEvent extends ValueObject {
  constructor() {
    super();
  }

  /**
   * type
   */
  private _type: DocumentEventType;
  public get type(): DocumentEventType {
    return this._type;
  }

  /**
   * date
   */
  private _date: Date;
  public get date(): Date {
    return this._date;
  }

  /**
   * username
   */
  private _username: string;
  public get username(): string {
    return this._username;
  }
}

/**
 * DocumentEventType
 */
export enum DocumentEventType {
  Created,
  Revised,
  Published,
  Archived
}
