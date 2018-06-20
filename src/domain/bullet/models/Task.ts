import { ValueObject } from "../../common/components/ValueObject";

export class Task extends ValueObject {
  private _desc: string;
  private _status: TaskStatus;

  constructor(desc: string, status: TaskStatus) {
    super();
    this._desc = desc;
    this._status = status;
  }

  get desc(): string {
    return this._desc;
  }

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
