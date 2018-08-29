import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextProcess
 */
export class ContextProcess extends ValueObject {
  constructor() {
    super();
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
   * username
   */
  private _username: string;
  public get username(): string {
    return this._username;
  }

  /**
   * objectives
   */
  private _objectives: string;
  public get objectives(): string {
    return this._objectives;
  }

  /**
   * scope
   */
  private _scope: string;
  public get scope(): string {
    return this._scope;
  }
}
