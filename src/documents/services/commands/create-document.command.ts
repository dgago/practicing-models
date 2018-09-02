import { DocumentSource } from "../../entities/document/document.entity";
import { DocumentCopy } from "../../entities/document/models/document-copy.vo";
import { IPrincipal } from "./principal";

export class CreateDocumentCommand {
  /**
   * user
   */
  private _user: IPrincipal;
  public get user(): IPrincipal {
    return this._user;
  }

  /**
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }

  /**
   * processId
   */
  private _processId: string;
  public get processId(): string {
    return this._processId;
  }

  /**
   * fileId
   */
  private _fileId: string;
  public get fileId(): string {
    return this._fileId;
  }

  /**
   * source
   */
  private _source: DocumentSource;
  public get source(): DocumentSource {
    return this._source;
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
