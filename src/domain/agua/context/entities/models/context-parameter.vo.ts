import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextParameter
 */
export class ContextParameter extends ValueObject {
  constructor(
    name: string,
    type: ContextParamterType,
    description: string,
    items: string[]
  ) {
    super();

    this._name = name;
    this._type = type;
    this._description = description;
    this._items = items;
  }

  /**
   * name
   */
  private _name: string;
  public get name(): string {
    return this._name;
  }

  /**
   * type
   */
  private _type: ContextParamterType;
  public get type(): ContextParamterType {
    return this._type;
  }

  /**
   * description
   */
  private _description: string;
  public get description(): string {
    return this._description;
  }

  /**
   * items
   */
  private _items: string[];
  public get items(): ReadonlyArray<string> {
    return this._items;
  }
}

export enum ContextParamterType {
  Internal,
  External
}
