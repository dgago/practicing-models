import { IDomainEvent } from "./IDomainEvent";

export class DomainEventPublisher {
  private _subscribers: IDomainEventSubscriber<IDomainEvent>[] = [];
  private _publishing = false;

  public publish<T extends IDomainEvent>(domainEvent: T): void {
    if (this._publishing || !this.hasSubscribers()) {
      return;
    }

    try {
      this._publishing = true;

      let eventType = typeof domainEvent;
      for (const subscriber of this._subscribers) {
        let subscribedToType = subscriber.subscribedToEventType();
        if (
          (typeof(eventType) instanceof subscribedToType) ||
          (subscribedToType instanceof IDomainEvent)
        ) {
          subscriber.handleEvent(domainEvent);
        }
      }
    } finally {
      this._publishing = false;
    }
  }

  public reset(): void {
    if (!this._publishing) {
      this._subscribers = [];
    }
  }

  public subscribe(subscriber: IDomainEventSubscriber<IDomainEvent>): void {
    if (!this._publishing) {
      this._subscribers.push(subscriber);
    }
  }

  private hasSubscribers(): boolean {
    return this._subscribers != null && this._subscribers.length > 0;
  }
}

export interface IDomainEventSubscriber<T extends IDomainEvent> {
  subscribedToEventType(): void;
}
