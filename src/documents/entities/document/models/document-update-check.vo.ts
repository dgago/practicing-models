import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";

/**
 * DocumentUpdateCheck
 */
export class DocumentUpdateCheck extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    date: Joi.date().required(),
    comments: Joi.string()
  });

  /**
   * Constructor.
   */
  constructor(
    private _username: string,
    private _comments: string,
    private _date: Date = new Date()
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
   * date
   */
  public get date(): Date {
    return this._date;
  }

  /**
   * comments
   */
  public get comments(): string {
    return this._comments;
  }
}
