import * as Joi from "joi";
import { ValueObject } from "../../../core/entities/value-object";
import { IPrincipal } from "./principal";
import { DocumentStatus } from "../../entities/document/document.entity";

/**
 * DocumentCommand
 */
export class DocumentCommand extends ValueObject {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    user: Joi.object().keys({
      tenantId: Joi.string()
        .alphanum()
        .max(256)
        .required(),
      username: Joi.string()
        .alphanum()
        .max(256)
        .required()
    }),
    documentId: Joi.string()
      .alphanum()
      .max(256)
      .required(),
    comments: Joi.string()
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
   * documentId
   */
  private _documentId: string;
  public get documentId(): string {
    return this._documentId;
  }

  /**
   * comments
   */
  private _comments: string;
  public get comments(): string {
    return this._comments;
  }

  /**
   * status
   */
  private _status: DocumentStatus;
  public get status(): DocumentStatus {
    return this._status;
  }
}
