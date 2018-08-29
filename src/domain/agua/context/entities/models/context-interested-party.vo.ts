import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextInterestedParty
 */
export class ContextInterestedParty extends ValueObject {
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
  private _type: ContextInterestedPartyType;
  public get type(): ContextInterestedPartyType {
    return this._type;
  }

  /**
   * canStopOperations
   */
  private _canStopOperations: boolean;
  public get canStopOperations(): boolean {
    return this._canStopOperations;
  }

  /**
   * canAlterProcessOrProduct
   */
  private _canAlterProcessOrProduct: boolean;
  public get canAlterProcessOrProduct(): boolean {
    return this._canAlterProcessOrProduct;
  }

  /**
   * isStrategic
   */
  private _isStrategic: boolean;
  public get isStrategic(): boolean {
    return this._isStrategic;
  }

  /**
   * requirements
   */
  private _requirements: string[];
  public get requirements(): string[] {
    return this._requirements;
  }

  /**
   * processes
   */
  private _processes: string[];
  public get processes(): string[] {
    return this._processes;
  }
}

export enum ContextInterestedPartyType {
  Internal,
  External
}
