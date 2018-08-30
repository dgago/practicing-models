import * as joi from "joi";
import { Entity } from "../../../core/entities/entity";
import { DocumentCopy } from "./models/document-copy.vo";
import { DocumentEventType } from "./models/document-event.vo";
import { DocumentUpdateCheck } from "./models/document-update-check.vo";
import { File } from "./models/file.vo";

/**
 * Document
 */
export class Document extends Entity<string> {
  constructor(
    id: string,
    private _code: string,
    private _name: string,
    private _file: File,
    private _source: DocumentSource
  ) {
    super(id);

    this._status = DocumentStatus.Draft;
  }

  /**
   * code
   */
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
  private _comments: string;
  public get comments(): string {
    return this._comments;
  }

  /**
   * versions
   */
  private _versions: File[] = [];
  public get versions(): ReadonlyArray<File> {
    return this._versions;
  }

  /**
   * copies
   */
  private _copies: DocumentCopy[] = [];
  public get copies(): ReadonlyArray<DocumentCopy> {
    return this._copies;
  }

  /**
   * documentEvents
   */
  private _documentEvents: DocumentEventType[] = [];
  public get documentEvents(): ReadonlyArray<DocumentEventType> {
    return this._documentEvents;
  }

  /**
   * updateChecks
   */
  private _updateChecks: DocumentUpdateCheck[] = [];
  public get updateChecks(): ReadonlyArray<DocumentUpdateCheck> {
    return this._updateChecks;
  }

  /**
   * updateFrequency
   */
  private _updateCheckFrequency: string;
  public get updateCheckFrequency(): string {
    return this._updateCheckFrequency;
  }

  /**
   * addVersion
   */
  public addVersion(item: File) {
    joi.assert(item, joi.required());
    joi.assert(item.contentType, joi.string().required());
    joi.assert(item.length, joi.number().required());
    joi.assert(item.name, joi.string().required());
    joi.assert(item.provider, joi.string().required());
    joi.assert(item.pages, joi.number());

    this._versions.push(this._file);
    this._file = item;
  }

  /**
   * addCopy
   */
  public addCopy(item: DocumentCopy) {
    joi.assert(item, joi.required());
    joi.assert(item.location, joi.string().required());
    joi.assert(item.type, joi.required());

    this._copies.push(item);
  }

  /**
   * addUpdateCheck
   */
  public addUpdateCheck(item: DocumentUpdateCheck) {
    joi.assert(item, joi.required());
    joi.assert(item.date, joi.date().required());
    joi.assert(item.comments, joi.string());

    this._updateChecks.push(item);
  }

  /**
   * publish
   */
  public publish() {
    if (this._status !== DocumentStatus.Revised) {
      throw new Error(
        "No es posible publicar este documento, ya que no ha sido revisado."
      );
    }

    this._status = DocumentStatus.Published;
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
  Revised,
  Published,
  Archived
}
