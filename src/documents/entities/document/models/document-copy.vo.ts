import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";

/**
 * DocumentCopy
 */
export class DocumentCopy extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    type: Joi.valid(Object.keys(DocumentCopyType)).required(),
    location: Joi.string()
      .max(256)
      .required(),
    count: Joi.number()
      .min(1)
      .required()
  });

  /**
   * Constructor.
   */
  constructor(
    private _name: string,
    private _type: DocumentCopyType,
    private _location: string,
    private _count: number = 1
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
   * type
   */
  public get type(): DocumentCopyType {
    return this._type;
  }

  /**
   * location
   */
  public get location(): string {
    return this._location;
  }

  /**
   * count
   */
  public get count(): number {
    return this._count;
  }
}

export enum DocumentCopyType {
  Controlled,
  NotControlled
}
