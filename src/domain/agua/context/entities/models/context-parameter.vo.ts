import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextParameter
 */
export class ContextParameter extends ValueObject {
  constructor() {
    super();
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
  public get items(): string[] {
    return this._items;
  }
}

export enum ContextParamterType {
  Internal,
  External
}