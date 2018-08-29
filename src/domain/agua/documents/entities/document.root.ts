import * as joi from "joi";
import { Root } from "../../../core/entities/root";
import { DocumentModified } from "./events/document-version-added.event";
import { DocumentCopy } from "./models/document-copy.vo";
import { DocumentEventType } from "./models/document-event.vo";
import { DocumentUpdateCheck } from "./models/document-update-check.vo";
import { File } from "./models/file.vo";

/**
 * DocumentRoot
 */
export class DocumentRoot extends Root<string> {
  constructor(
    id: string,
    name: string,
    file: File,
    source: DocumentSource,
    updateCheckFrequency: string
  ) {
    super(id);

    // TODO: arreglar este constructor
    this._name = name;
    this._file = file;
    this._source = source;
    this._updateCheckFrequency = updateCheckFrequency;
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
   * file
   */
  private _file: File;
  public get file(): File {
    return this._file;
  }

  /**
   * versions
   */
  private _versions: File[];
  public get versions(): File[] {
    return this._versions;
  }

  /**
   * copies
   */
  private _copies: DocumentCopy[];
  public get copies(): DocumentCopy[] {
    return this._copies;
  }

  /**
   * documentEvents
   */
  private _documentEvents: DocumentEventType;
  public get documentEvents(): DocumentEventType {
    return this._documentEvents;
  }

  /**
   * source
   */
  private _source: DocumentSource;
  public get source(): DocumentSource {
    return this._source;
  }

  /**
   * updateFrequency
   */
  private _updateCheckFrequency: string;
  public get updateCheckFrequency(): string {
    return this._updateCheckFrequency;
  }

  /**
   * updateChecks
   */
  private _updateChecks: DocumentUpdateCheck[];
  public get updateChecks(): DocumentUpdateCheck[] {
    return this._updateChecks;
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

    this.addEvent(new DocumentModified(this));
  }

  /**
   * addCopy
   */
  public addCopy(item: DocumentCopy) {
    joi.assert(item, joi.required());
    joi.assert(item.location, joi.string().required());
    joi.assert(item.type, joi.required());

    this._copies.push(item);

    this.addEvent(new DocumentModified(this));
  }

  /**
   * addUpdateCheck
   */
  public addUpdateCheck(item: DocumentUpdateCheck) {
    joi.assert(item, joi.required());
    joi.assert(item.date, joi.date().required());
    joi.assert(item.comments, joi.string());

    this._updateChecks.push(item);

    this.addEvent(new DocumentModified(this));
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
