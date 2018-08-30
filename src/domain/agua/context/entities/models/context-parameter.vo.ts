import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextParameter
 */
export class ContextParameter extends ValueObject {
  constructor(
    private _name: string,
    private _type: ContextParamterType,
    private _description: string,
    private _items: string[]
  ) {
    super();
  }

  /**
   * name
   */
  public get name(): string {
    return this._name;
  }

  /**
   * type
   */
  public get type(): ContextParamterType {
    return this._type;
  }

  /**
   * description
   */
  public get description(): string {
    return this._description;
  }

  /**
   * items
   */
  public get items(): ReadonlyArray<string> {
    return this._items;
  }
}

export enum ContextParamterType {
  Internal,
  External
}
