import * as joi from "joi";
import { Root } from "../../../core/entities/root";
import { ContextParameter } from "./models/context-parameter.vo";
import { ContextInterestedParty } from "./models/context-interested-party.vo";
import { ContextSwot } from "./models/context-swot.vo";
import { ContextProcess } from "./models/context-process.vo";
import { ValueObject } from "../../../core/entities/value-object";
import { Collection } from "../../../core/entities/collection";

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

/**
 * ContextParameters
 */
export class ContextParameters extends Collection<ContextParameter, string> {
  constructor() {
    super();
  }

  /**
   * addParameter
   */
  public addParameter(item: ContextParameter) {
    joi.assert(item, joi.required());
    joi.assert(item.name, joi.string().required());
       joi.assert(item.type, joi.required());

       this.add(item);
    return;
  }
}