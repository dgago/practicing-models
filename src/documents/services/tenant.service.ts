import * as Joi from "joi";
import { Repo } from "../../core/data/repo";
import { AggregateRoot } from "../../core/entities/aggregate-root";
import { DomainService } from "../../core/services/domain-service";
import { IPrincipal } from "./commands/principal";

export class TenantDomainService extends DomainService {
  private _tenantRepo: Repo<TenantRoot, TenantRoot, string>;

  /**
   * Obtiene un inquilino.
   */
  public async getTenant(
    user: IPrincipal,
    tenantId: string
  ): Promise<TenantRoot> {
    this.notFalsy(user, "user");
    this.notFalsy(tenantId, "tenantId");

    const tenant = await this._tenantRepo.findOne(tenantId);

    // TODO: validar si el usuario puede ver el inquilino solicitado.

    return tenant;
  }
}

/**
 * Tenant
 */
export class TenantRoot extends AggregateRoot<string> {
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
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }
}
