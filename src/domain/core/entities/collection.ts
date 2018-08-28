import { Entity } from "./entity";

export class Collection<T extends Entity<K>, K> {
  private _items: T[];

  public get items() {
    return this._items;
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
