import { DomainEvent } from "../events/domain-event.vo";
import { Entity } from "./entity";

export class Root<K> extends Entity<K> {
  private _events: DomainEvent[] = [];

  get events() {
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
