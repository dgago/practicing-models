import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextInterestedParty
 */
export class ContextInterestedParty extends ValueObject {
  constructor(
    private _name: string,
    private _type: ContextInterestedPartyType,
    private _canStopOperations: boolean,
    private _canAlterProcessOrProduct: boolean,
    private _isStrategic: boolean,
    private _requirements: string[],
    private _processes: string[]
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
  public get type(): ContextInterestedPartyType {
    return this._type;
  }

  /**
   * canStopOperations
   */
  public get canStopOperations(): boolean {
    return this._canStopOperations;
  }

  /**
   * canAlterProcessOrProduct
   */
  public get canAlterProcessOrProduct(): boolean {
    return this._canAlterProcessOrProduct;
  }

  /**
   * isStrategic
   */
  public get isStrategic(): boolean {
    return this._isStrategic;
  }

  /**
   * requirements
   */
  public get requirements(): ReadonlyArray<string> {
    return this._requirements;
  }

  /**
   * processes
   */
  public get processes(): ReadonlyArray<string> {
    return this._processes;
  }
}

export enum ContextInterestedPartyType {
  Internal,
  External
}
