export class Entity<T> {
  protected _id: T;

  constructor(id: T) {
    this._id = id;
  }
}
