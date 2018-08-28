import { ValueObject } from "../../../../core/entities/value-object";

/**
 * File
 */
export class File extends ValueObject {
  constructor(
    id: string,
    name: string,
    contentType: string,
    provider: string,
    length: number,
    pages?: number
  ) {
    super();

    this._id = id;
    this._name = name;
    this._contentType = contentType;
    this._provider = provider;
    this._length = length;
    this._pages = pages;
  }

  /**
   * id
   */
  private _id: string;
  public get id(): string {
    return this._id;
  }

  /**
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }

  /**
   * contentType
   */
  private _contentType: string;
  public get contentType(): string {
    return this._contentType;
  }

  /**
   * provider
   */
  private _provider: string;
  public get provider(): string {
    return this._provider;
  }

  /**
   * length
   */
  private _length: number;
  public get length(): number {
    return this._length;
  }

  /**
   * pages?
   */
  private _pages?: number;
  public get pages(): number {
    return this._pages;
  }
}
