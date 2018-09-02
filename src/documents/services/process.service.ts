import * as Joi from "joi";
import { Entity } from "../../core/entities/entity";
import { DomainService } from "../../core/services/domain-service";
import { IPrincipal } from "./commands/create-document.command";
import { DocumentCopy } from "../entities/document/models/document-copy.vo";

export class ProcessDomainService extends DomainService {
  /**
   * Obtiene un proceso.
   */
  public getProcess(
    user: IPrincipal,
    tenantId: string,
    processId: string
  ): Promise<Process> {
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
    revisionUsername: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    approvalUsername: Joi.string()
      .alphanum()
      .max(256)
      .required()
    // date: Joi.date().required()
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
   * revisionUsername
   */
  private _revisionUsername: string;
  public get revisionUsername(): string {
    return this._revisionUsername;
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
   * comments
   */
  private _comments: string;
  public get comments(): string {
    return this._comments;
  }

  /**
   * copies
   */
  private _copies: DocumentCopy[];
  public get copies(): ReadonlyArray<DocumentCopy> {
    return this._copies.slice();
  }
}
