import { IFlow, IFlowable } from "./models/flowinstance";
import { IStore } from "../../db/store";
import {
  IFlowDefinition,
  IFlowState,
  IFlowEvent,
  FlowActionType
} from "./models/flowdef";

export class Flow<T extends IFlowable<T>> implements IFlow<T> {
  name: string;
  version: string;
  state: string;

  private store: IFlowStore;
  private flow: IFlowDefinition;

  constructor(store: IFlowStore) {
    this.store = store;
  }

  raiseEvent(eventName: string, item: T): void {
    if (!this.flow) {
      this.flow = this.store.find({
        name: this.name,
        version: this.version
      }).items[0];
    }

    const state: IFlowState = this.flow.states.find(
      (x) => x.name === this.state
    );

    if (!state) {
      throw Error(`State ${this.state} not found.`);
    }

    const event: IFlowEvent = state.events.find((x) => x.name === eventName);
    if (!event) {
      return;
    }

    if (this.evaluateCondition(eventName, item, event)) {
      for (const action of event.actions) {
        if (action.type === FlowActionType.ChangeState) {
          this.state = action.name;
        } else {
          action.execute(event, item);
        }
      }
    }
  }

  evaluateCondition(eventName: string, item: T, event: IFlowEvent): boolean {
    return true;
  }
}

export interface IFlowStore extends IStore<IFlowDefinition, string> {}
