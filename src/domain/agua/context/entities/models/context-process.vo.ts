import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextProcess
 */
export class ContextProcess extends ValueObject {
  constructor(
    private _code: string,
    private _name: string,
    private _username: string,
    private _objectives: string,
    private _scope: string
  ) {
    super();
  }

  /**
   * code
   */
  public get code(): string {
    return this._code;
  }

  /**
   * name
   */
  public get name(): string {
    return this._name;
  }

  /**
   * username
   */
  public get username(): string {
    return this._username;
  }

  /**
   * objectives
   */
  public get objectives(): string {
    return this._objectives;
  }

  /**
   * scope
   */
  public get scope(): string {
    return this._scope;
  }
}
