import { ValueObject } from "../../core/entities/value-object";

export class Task extends ValueObject {
  constructor(desc: string, status: TaskStatus) {
    super();
    this._desc = desc;
    this._status = status;
  }

  private _desc: string;
  get desc(): string {
    return this._desc;
  }

  private _status: TaskStatus;
  get status(): TaskStatus {
    return this._status;
  }
}

export enum TaskStatus {
  All = 0,
  Pending = 1,
  Done = 2,
  Cancelled = 3
}
