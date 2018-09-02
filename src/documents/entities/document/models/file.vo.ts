import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";

/**
 * File
 */
export class File extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    contentType: Joi.string()
      .alphanum()
      .required(),
    provider: Joi.string()
      .alphanum()
      .required(),
    length: Joi.number()
      .integer()
      .min(1)
      .required(),
    pages: Joi.number()
      .integer()
      .min(1)
      .required()
  });

  /**
   * Constructor.
   */
  constructor(
    private _name: string,
    private _contentType: string,
    private _provider: string,
    private _length: number,
    private _pages: number = 1
  ) {
    super();

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }
  }

  /**
   * name
   */
  public get name(): string {
    return this._name;
  }

  /**
   * contentType
   */
  public get contentType(): string {
    return this._contentType;
  }

  /**
   * provider
   */
  public get provider(): string {
    return this._provider;
  }

  /**
   * length
   */
  public get length(): number {
    return this._length;
  }

  /**
   * pages?
   */
  public get pages(): number {
    return this._pages;
  }
}
