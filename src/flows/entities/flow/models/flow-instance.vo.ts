import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";

/**
 * FlowInstance
 */
export class FlowInstance extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    flowId: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    state: Joi.string()
      .alphanum()
      .max(256)
      .required()
  });

  /**
   * Constructor.
   */
  constructor(private _flowId: string, private _state: string) {
    super();

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }
  }

  /**
   * flowId
   */
  public get flowId(): string {
    return this._flowId;
  }

  /**
   * state
   */
  public get state(): string {
    return this._state;
  }
}
