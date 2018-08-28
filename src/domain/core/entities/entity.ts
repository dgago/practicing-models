import bcrypt = require("bcrypt");

export class Entity<K> {
  constructor(id: K) {
    this._id = id;
  }

  /**
   * id
   */
  private _id: K;
  public get id(): K {
    return this._id;
  }

  public equals(item: Entity<K>): boolean {
    return bcrypt.compareSync(this.getReference(), item.getHashCode());
  }

  public getHashCode() {
    return bcrypt.hashSync(this.getReference(), 5);
  }

  private getReference(): any {
    return this.constructor.name + this._id;
  }
}