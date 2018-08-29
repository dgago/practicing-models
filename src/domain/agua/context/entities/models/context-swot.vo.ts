import { ValueObject } from "../../../../core/entities/value-object";

/**
 * ContextSwot
 */
export class ContextSwot extends ValueObject {
  constructor() {
    super();
  }

  /**
   * strenghts
   */
  private _strenghts: string[];
  public get strenghts(): string[] {
    return this._strenghts;
  }

  /**
   * weaknesses
   */
  private _weaknesses: string[];
  public get weaknesses(): string[] {
    return this._weaknesses;
  }

  /**
   * opportunities
   */
  private _opportunities: string[];
  public get opportunities(): string[] {
    return this._opportunities;
  }

  /**
   * threats
   */
  private _threats: string[];
  public get threats(): string[] {
    return this._threats;
  }
}
