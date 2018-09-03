import * as Joi from "joi";
import { Entity } from "../../core/entities/entity";
import { DomainService } from "../../core/services/domain-service";
import { IPrincipal } from "./commands/principal";
import { TenantRoot } from "./tenant.service";

export class ProcessDomainService extends DomainService {
  /**
   * Obtiene un proceso.
   */
  public getProcess(
    tenant: TenantRoot,
    user: IPrincipal,
    processId: string
  ): Promise<Process> {
    this.notFalsy(tenant, "tenant");
    this.notFalsy(user, "user");
    this.notFalsy(processId, "processId");

    // TODO: validar si el usuario puede ver el proceso solicitado.

    return;
  }
}

/**
 * Process
 */
export class Process extends Entity<string> {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    name: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    reviewUsername: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    approvalUsername: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    publishingUsername: Joi.string()
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
   * code
   */
  private _code: string;
  public get code(): string {
    return this._code;
  }

  /**
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }

  /**
   * reviewUsername
   */
  private _reviewUsername: string;
  public get reviewUsername(): string {
    return this._reviewUsername;
  }

  /**
   * approvalUsername
   */
  private _approvalUsername: string;
  public get approvalUsername(): string {
    return this._approvalUsername;
  }

  /**
   * publishingUsername
   */
  private _publishingUsername: string;
  public get publishingUsername(): string {
    return this._publishingUsername;
  }

  /**
   * publishingFlowId
   */
  private _publishingFlowId: string;
  public get publishingFlowId(): string {
    return this._publishingFlowId;
  }
}
