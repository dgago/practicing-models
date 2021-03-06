import { Entity } from "./entity";
import { ValueObject } from "./value-object";

export class Collection<T extends Entity<K> | ValueObject, K> {
  protected _items: T[];

  public get items(): ReadonlyArray<T> {
    return this._items.slice();
  }

  protected add(item: T) {
    if (!item) {
      return;
    }

    this._items.push(item);
  }

  protected find(predicate: Predicate<T>): T {
    return this._items.find(predicate);
  }
}

export type Predicate<T> = (
  this: void,
  value: T,
  index: number,
  obj: T[]
) => value is T;
