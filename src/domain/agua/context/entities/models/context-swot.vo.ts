import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextSwot
 */
export class ContextSwot extends ValueObject {
  constructor(
    private _strenghts: string[] = [],
    private _weaknesses: string[] = [],
    private _opportunities: string[] = [],
    private _threats: string[] = []
  ) {
    super();
  }

  /**
   * strenghts
   */
  public get strenghts(): ReadonlyArray<string> {
    return this._strenghts;
  }

  /**
   * weaknesses
   */
  public get weaknesses(): ReadonlyArray<string> {
    return this._weaknesses;
  }

  /**
   * opportunities
   */
  public get opportunities(): ReadonlyArray<string> {
    return this._opportunities;
  }

  /**
   * threats
   */
  public get threats(): ReadonlyArray<string> {
    return this._threats;
  }
}
