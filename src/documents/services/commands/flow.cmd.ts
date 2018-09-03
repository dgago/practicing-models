import * as Joi from "joi";
import { ValueObject } from "../../../core/entities/value-object";
import { IPrincipal } from "./principal";

/**
 * FlowCommand
 */
export class FlowCommand extends ValueObject {
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
   * user
   */
  private _user: IPrincipal;
  public get user(): IPrincipal {
    return this._user;
  }

  /**
   * flowId
   */
  private _flowId: string;
  public get flowId(): string {
    return this._flowId;
  }

  /**
   * instanceId
   */
  private _instanceId: string;
  public get instanceId(): string {
    return this._instanceId;
  }

  /**
   * data
   */
  private _data: any;
  public get data(): any {
    return this._data;
  }
}
