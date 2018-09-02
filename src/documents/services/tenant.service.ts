import * as Joi from "joi";
import { Entity } from "../../core/entities/entity";
import { DomainService } from "../../core/services/domain-service";
import { IPrincipal } from "./commands/create-document.command";

export class TenantDomainService extends DomainService {
  /**
   * Obtiene un inquilino.
   */
  public getTenant(user: IPrincipal, id: string): Promise<Tenant> {
    // TODO: validar si el usuario puede ver el inquilino solicitado.

    return;
  }
}

/**
 * Tenant
 */
export class Tenant extends Entity<string> {
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
