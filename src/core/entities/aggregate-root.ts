import { IEntity, Entity } from "./entity";
import { DomainEvent } from "../events/domain-event.vo";

export interface IAggregateRoot<K> extends IEntity<K> {
  events: ReadonlyArray<DomainEvent>;
}

export class AggregateRoot<K> extends Entity<K> implements IAggregateRoot<K> {
  /**
   * Eventos que han tenido lugar para el item.
   */
  private _events: DomainEvent[] = [];

  /**
   * Obtiene los eventos que han tenido lugar para el item.
   */
  public get events(): ReadonlyArray<DomainEvent> {
    return this._events.slice();
  }

  /**
   * Agrega un evento a la lista de eventos de dominio.
   * @param event Evento que sucedió.
   */
  protected addEvent(event: DomainEvent) {
    if (!event) {
      return;
    }
    this._events.push(event);
  }

  /**
   * Limpia la lista de eventos de dominio para este item.
   */
  protected clearEvents() {
    this._events = [];
  }
}
