import * as Joi from "joi";
import { ValueObject } from "../entities/value-object";

/**
 * DomainEvent
 */
export class DomainEvent extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    date: Joi.date().required()
  });

  /**
   * Constructor.
   */
  constructor(private _date: Date = new Date()) {
    super();

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }
  }

  /**
   * date
   */
  public get date(): Date {
    return this._date;
  }
}
