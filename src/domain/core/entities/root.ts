import { DomainEvent } from "../events/domain-event.vo";

export class Root {
  private _events: DomainEvent[] = [];

  get events(): ReadonlyArray<DomainEvent> {
    return this._events;
  }

  protected addEvent(event: DomainEvent) {
    if (!event) {
      return;
    }
    this._events.push(event);
  }

  protected clearEvents() {
    this._events = [];
  }
}
