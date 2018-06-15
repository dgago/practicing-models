import { IIdentificable } from "../../common/models/identificable";

export interface IFlowAction {
  type: FlowActionType;
  name: string;
}

export enum FlowActionType {
  ChangeState = 1,
  Execute = 2
}

export interface IChangeStateFlowAction extends IFlowAction {
  newState: string;
}

export interface IFlowCondition {
  condition: string;
}

export interface IFlowEvent {
  name: string;
  condition: IFlowCondition;
  actions: IFlowAction[];
}

export interface IFlowState {
  name: string;
  events: IFlowEvent[];
}

export interface IFlowDefinition extends IIdentificable {
  version: string;
  initialState: string;
  states: IFlowState[];
  dashboard: string;
}
