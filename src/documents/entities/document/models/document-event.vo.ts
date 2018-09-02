import { ValueObject } from "../../../../core/entities/value-object";

import * as Joi from "joi";

/**
 * DocumentEvent
 */
export class DocumentEvent extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    name: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    type: Joi.valid(Object.keys(DocumentEventType)).required(),
    date: Joi.date().required()
  });

  /**
   * Constructor.
   */
  constructor(
    private _username: string,
    private _name: string,
    private _type: DocumentEventType,
    private _date: Date
  ) {
    super();

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }
  }

  /**
   * username
   */
  public get username(): string {
    return this._username;
  }

  /**
   * name
   */
  public get name(): string {
    return this._name;
  }

  /**
   * type
   */
  public get type(): DocumentEventType {
    return this._type;
  }

  /**
   * date
   */
  public get date(): Date {
    return this._date;
  }
}

/**
 * DocumentEventType
 */
/**
 * DocumentEventType
 */
export enum DocumentEventType {
  Created,
  SentForRevision,
  Revised,
  Approved,
  Published,
  Archived,
  Updated
}
