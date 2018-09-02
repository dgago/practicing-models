import { DomainEvent } from "./domain-event.vo";

export class DomainEventPublisher {
  private _subscribers: Array<IDomainEventSubscriber<DomainEvent>> = [];
  private _publishing = false;

  public publish<T extends DomainEvent>(domainEvent: T): void {
    if (this._publishing || !this.hasSubscribers()) {
      return;
    }

    try {
      this._publishing = true;

      const eventType = typeof domainEvent;
      for (const subscriber of this._subscribers) {
        const subscribedToType = subscriber.subscribedToEventType();
        // if (
        //   (typeof(eventType) instanceof subscribedToType) ||
        //   (subscribedToType instanceof IDomainEvent)
        // ) {
        //   subscriber.handleEvent(domainEvent);
        // }
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

  public subscribe(subscriber: IDomainEventSubscriber<DomainEvent>): void {
    if (!this._publishing) {
      this._subscribers.push(subscriber);
    }
  }

  private hasSubscribers(): boolean {
    return this._subscribers != null && this._subscribers.length > 0;
  }
}

export interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedToEventType(): void;
}
