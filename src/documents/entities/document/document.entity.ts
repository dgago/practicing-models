import * as Joi from "joi";
import { AggregateRoot } from "../../../core/entities/aggregate-root";
import { DocumentModifiedEvent } from "../../events/document-modified.event";
import { DocumentCopy } from "./models/document-copy.vo";
import { DocumentEvent, DocumentEventType } from "./models/document-event.vo";
import { DocumentUpdateCheck } from "./models/document-update-check.vo";
import { File } from "./models/file.vo";
import { DocumentStatusChangedEvent } from "../../events/document-status-changed.event";
import { FlowInstance } from "../../../flows/entities/flow/models/flow-instance.vo";
import { DocumentTask, DocumentTaskStatus } from "./models/document-task.vo";
import { ArgumentError } from "../../../core/errors/argument.error";

/**
 * Document
 */
export class DocumentRoot extends AggregateRoot<string> {
  /**
   * Esquema de validación.
   */
  private _schema = Joi.object().keys({
    documentId: Joi.string()
      .alphanum()
      .max(256)
      .required()
  });

  /**
   * Constructor.
   */
  constructor(
    id: string,
    private _tenantId: string,
    private _username: string,
    private _name: string,
    private _file: File,
    private _source: DocumentSource,
    private _processId: string,
    private _reviewUsername: string,
    private _approvalUsername: string,
    private _publishingUsername: string,
    private _comments: string,
    private _copies: DocumentCopy[],
    private _flow: FlowInstance
  ) {
    super(id);

    this._code = this.generateCode();
    this._status = DocumentStatus.Draft;

    this._documentEvents = [];
    this._updateChecks = [];
    this._versions = [];
    this._copies = _copies || [];

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }

    this.addDocumentEvent(
      _username,
      "Documento creado.",
      DocumentEventType.Created,
      new Date()
    );

    this.addEvent(new DocumentModifiedEvent(this));
  }

  /**
   * tenantId
   */
  public get tenantId(): string {
    return this._tenantId;
  }

  /**
   * username
   */
  public get username(): string {
    return this._username;
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
  public get name(): string {
    return this._name;
  }

  /**
   * file
   */
  public get file(): File {
    return this._file;
  }

  /**
   * source
   */
  public get source(): DocumentSource {
    return this._source;
  }

  /**
   * status
   */
  private _status: DocumentStatus;
  public get status(): DocumentStatus {
    return this._status;
  }

  /**
   * comments
   */
  public get comments(): string {
    return this._comments;
  }

  /**
   * processId
   */
  public get processId(): string {
    return this._processId;
  }

  /**
   * versions
   */
  private _versions: DocumentRoot[];
  public get versions(): ReadonlyArray<DocumentRoot> {
    return this._versions.slice();
  }

  /**
   * copies
   */
  public get copies(): ReadonlyArray<DocumentCopy> {
    return this._copies.slice();
  }

  /**
   * documentEvents
   */
  private _documentEvents: DocumentEvent[];
  public get documentEvents(): ReadonlyArray<DocumentEvent> {
    return this._documentEvents.slice();
  }

  /**
   * updateChecks
   */
  private _updateChecks: DocumentUpdateCheck[];
  public get updateChecks(): ReadonlyArray<DocumentUpdateCheck> {
    return this._updateChecks.slice();
  }

  /**
   * updateFrequency
   */
  private _updateCheckFrequency: string;
  public get updateCheckFrequency(): string {
    return this._updateCheckFrequency;
  }

  /**
   * reviewUsername
   */
  public get reviewUsername(): string {
    return this._reviewUsername;
  }

  /**
   * approvalUsername
   */
  public get approvalUsername(): string {
    return this._approvalUsername;
  }

  /**
   * publishingUsername
   */
  public get publishingUsername(): string {
    return this._publishingUsername;
  }

  /**
   * addUpdateCheck
   */
  public addUpdateCheck(username: string, comments: string, date: Date) {
    const item = new DocumentUpdateCheck(username, comments, date);
    this._updateChecks.push(item);
  }

  /**
   * flow
   */
  public get flow(): FlowInstance {
    return this._flow;
  }

  /**
   * tasks
   */
  private _tasks: DocumentTask[];
  public get tasks(): ReadonlyArray<DocumentTask> {
    return this._tasks.slice();
  }

  /**
   * Modifica un documento.
   */
  update(
    username: string,
    name: string,
    file: File,
    source: DocumentSource,
    processId: string,
    reviewUsername: string,
    approvalUsername: string,
    publishingUsername: string,
    comments: string,
    copies: DocumentCopy[]
  ): void {
    this._name = name;
    this._file = file;
    this._source = source;
    this._processId = processId;
    this._reviewUsername = reviewUsername;
    this._approvalUsername = approvalUsername;
    this._publishingUsername = publishingUsername;
    this._publishingUsername = publishingUsername;
    this._comments = comments;
    this._copies = copies;

    const result = Joi.validate(this, this._schema);
    if (result) {
      throw new Error(`El objeto tiene un formato incorrecto: ${result.value}`);
    }

    // TODO: No se puede actualizar un documento obsoleto

    this.addDocumentEvent(
      username,
      "Documento actualizado.",
      DocumentEventType.Updated,
      new Date()
    );

    this.addEvent(new DocumentModifiedEvent(this));
  }

  /**
   * changeStatus
   */
  changeStatus(
    username: string,
    status: DocumentStatus,
    comments: string
  ): any {
    // TODO: podría enviarlo también alguien con permisos (?)
    const task = this.tasks.find(
      (x) => x.status === status && x.taskStatus === DocumentTaskStatus.Pending
    );
    if (!task) {
      throw new ArgumentError(
        `El documento no puede cambiar al estado ${status}.`
      );
    }

    this._status = status;
    this._comments = comments;

    this.addDocumentEvent(
      username,
      `Cambia a estado ${status}`,
      DocumentEventType.StatusChanged,
      new Date()
    );

    this.addEvent(new DocumentStatusChangedEvent(this));
  }

  /**
   * Agrega un evento al documento.
   */
  private addDocumentEvent(
    username: string,
    name: string,
    type: DocumentEventType,
    date: Date
  ): void {
    const item = new DocumentEvent(name, username, type, date);
    this._documentEvents.push(item);
  }

  /**
   * Genera el código del documento.
   */
  private generateCode(): string {
    // TODO: generar código del documento. Falta el tipo de documento.
    return "";
  }
}

/**
 * DocumentSource
 */
export enum DocumentSource {
  Internal,
  External
}

/**
 * DocumentStatus
 */
export enum DocumentStatus {
  Draft,
  InReview,
  Reviewed,
  Approved,
  Published,
  Archived
}
