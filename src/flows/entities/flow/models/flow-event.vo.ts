import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";
import { FlowAction } from "./flow-action.vo";

/**
 * FlowEvent
 */
export class FlowEvent extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    condition: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    actions: Joi.array().min(1)
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
   * condition
   */
  private _condition: string;
  public get condition(): string {
    return this._condition;
  }

  /**
   * actions
   */
  private _actions: FlowAction[];
  public get actions(): ReadonlyArray<FlowAction> {
    return this._actions.slice();
  }
}
