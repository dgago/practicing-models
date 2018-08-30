import { Entity } from "../../../core/entities/entity";
import { ContextInterestedParty } from "./models/context-interested-party.vo";
import { ContextParameter } from "./models/context-parameter.vo";
import { ContextProcess } from "./models/context-process.vo";
import { ContextSwot } from "./models/context-swot.vo";

export class Context extends Entity<string> {
  constructor(
    id: string,
    private _parameters: ContextParameter[] = [],
    private _interestedParties: ContextInterestedParty[] = [],
    private _swot: ContextSwot = new ContextSwot(),
    private _processes: ContextProcess[] = []
  ) {
    super(id);
  }

  /**
   * parameters
   */
  public get parameters(): ReadonlyArray<ContextParameter> {
    return this._parameters;
  }

  /**
   * interestedParties
   */
  public get interestedParties(): ReadonlyArray<ContextInterestedParty> {
    return this._interestedParties;
  }

  /**
   * swot
   */
  public get swot(): ContextSwot {
    return this._swot;
  }

  /**
   * processes
   */
  public get processes(): ReadonlyArray<ContextProcess> {
    return this._processes;
  }
}
