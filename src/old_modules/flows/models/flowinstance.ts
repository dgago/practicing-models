import { IFlowAction, IFlowEvent } from "./flowdef";

export interface IFlow<T extends IFlowable<T>> {
  name: string;
  version: string;
  state: string;

  raiseEvent(eventName: string, item: T): void;
}

export interface IFlowable<T extends IFlowable<T>> {
  flow: IFlow<T>;
  // execute(event: IFlowEvent, action: IFlowAction): void;
}
