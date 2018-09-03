import * as Joi from "joi";
import { AggregateRoot } from "../../../core/entities/aggregate-root";
import { IPrincipal } from "../../../documents/services/commands/principal";
import { TenantRoot } from "../../../documents/services/tenant.service";
import { FlowState } from "./models/flow-state.vo";

/**
 * FlowRoot
 */
export class FlowRoot extends AggregateRoot<string> {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .max(256)
      .required()
  });

  /**
   * Constructor.
   */
  constructor(id: string) {
    super(id);

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }
  }

  /**
   * tenantId
   */
  private _tenantId: string;
  public get tenantId(): string {
    return this._tenantId;
  }

  /**
   * roles
   */
  private _roles: string[];
  public get roles(): ReadonlyArray<string> {
    return this._roles.slice();
  }

  /**
   * initial
   */
  private _initial: string;
  public get initial(): string {
    return this._initial;
  }

  /**
   * states
   */
  private _states: FlowState[];
  public get states(): ReadonlyArray<FlowState> {
    return this._states.slice();
  }

  /**
   * Lanza un evento sobre una instancia.
   * @param tenant Inquilino.
   * @param user Usuario autenticado.
   * @param instanceId Instancia sobre la cual lanzar el evento.
   * @param data Datos asociados al evento.
   */
  raiseEvent(
    tenant: TenantRoot,
    user: IPrincipal,
    instanceId: string,
    data: any
  ): any {
    throw new Error("Method not implemented.");
  }
}
