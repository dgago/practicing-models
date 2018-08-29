import { Root } from "../../../core/entities/root";
import { ContextParameter } from "./models/context-parameter.vo";
import { ContextInterestedParty } from "./models/context-interested-party.vo";
import { ContextSwot } from "./models/context-swot.vo";
import { ContextProcess } from "./models/context-process.vo";

export class ContextRoot extends Root<string> {
  /**
   * parameters
   */
  private _parameters: ContextParameter[];
  public get parameters(): ContextParameter[] {
    return this._parameters;
  }

  /**
   * interestedParties
   */
  private _interestedParties: ContextInterestedParty[];
  public get interestedParties(): ContextInterestedParty[] {
    return this._interestedParties;
  }

  /**
   * swot
   */
  private _swot: ContextSwot;
  public get swot(): ContextSwot {
    return this._swot;
  }

  /**
   * processes
   */
  private _processes: ContextProcess[];
  public get processes(): ContextProcess[] {
    return this._processes;
  }
}
