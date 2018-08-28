import { Root } from "../../../core/entities/root";
import { DocumentVersionAdded } from "./events/document-version-added.event";
import { DocumentCopy } from "./models/document-copy.vo";
import { DocumentUpdateCheck } from "./models/document-update-check.vo";
import { File } from "./models/file.vo";

export class DocumentRoot extends Root<string> {
  /**
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
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
  private _copies: DocumentCopy;
  public get copies(): DocumentCopy {
    return this._copies;
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
  public addVersion(file: File) {
    this._versions.push(this._file);
    this._file = file;

    this.addEvent(new DocumentVersionAdded(this));
    return;
  }
}

export enum DocumentSource {
  Internal,
  External
}

export enum DocumentStatus {
  Active,
  Archived, // ?
  Obsolete
}
