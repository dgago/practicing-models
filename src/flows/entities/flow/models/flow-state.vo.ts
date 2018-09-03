import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";
import { FlowEvent } from "./flow-event.vo";

/**
 * FlowState
 */
export class FlowState extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    date: Joi.date().required()
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
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }

  /**
   * events
   */
  private _events: FlowEvent[];
  public get events(): ReadonlyArray<FlowEvent> {
    return this._events.slice();
  }

  /**
   * roles
   */
  private _roles: string[];
  public get roles(): ReadonlyArray<string> {
    return this._roles.slice();
  }
}
