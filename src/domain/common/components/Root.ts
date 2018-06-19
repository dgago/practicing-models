import { IDomainEvent } from "./IDomainEvent";

export class Root {
  private _id: string;
  private _version: number;
  private _events: IDomainEvent[] = [];

  addEvent(event: IDomainEvent) {
    if (!event) {
      return;
    }
    this._events.push(event);
  }
}
