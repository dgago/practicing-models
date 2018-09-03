import * as Joi from "joi";
import { ValueObject } from "../../../../core/entities/value-object";
import { DocumentStatus } from "../document.entity";

/**
 * DocumentTask
 */
export class DocumentTask extends ValueObject {
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
   * status
   */
  private _status: DocumentStatus;
  public get status(): DocumentStatus {
    return this._status;
  }

  /**
   * taskStatus
   */
  private _taskStatus: DocumentTaskStatus;
  public get taskStatus(): DocumentTaskStatus {
    return this._taskStatus;
  }
}

export enum DocumentTaskStatus {
  Pending,
  Completed
}
