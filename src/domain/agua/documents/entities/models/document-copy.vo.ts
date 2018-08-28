import { ValueObject } from "../../../../core/entities/value-object";

/**
 * DocumentCopy
 */
export class DocumentCopy extends ValueObject {
  constructor(location: string, quantity: number, type: DocumentCopyType) {
    super();
    this._location = location;
    this._quantity = quantity;
    this._type = type;
  }

  /**
   * location
   */
  private _location: string;
  public get location(): string {
    return this._location;
  }

  /**
   * quantity
   */
  private _quantity: number;
  public get quantity(): number {
    return this._quantity;
  }

  /**
   * type
   */
  private _type: DocumentCopyType;
  public get type(): DocumentCopyType {
    return this._type;
  }
}

enum DocumentCopyType {
  Controlled,
  NotControlled
}
