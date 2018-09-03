import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";

/**
 * FlowAction
 */
export class FlowAction extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    type: Joi.valid(Object.keys(FlowActionType))
  });

  /**
   * Constructor.
   */
  constructor() {
    super();

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }
  }

  /**
   * type
   */
  private _type: FlowActionType;
  public get type(): FlowActionType {
    return this._type;
  }

  /**
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }

  /**
   * Metadata
   */
  [key: string]: any;
}

enum FlowActionType {
  ChangeState,
  Execute
}
