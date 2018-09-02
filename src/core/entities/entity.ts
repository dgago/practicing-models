import * as bcrypt from "bcrypt";

export interface IEntity<K> {
  id: K;
  equals(item: IEntity<K>): boolean;
  getHashcode(): string;
  getReference(): string;
}

export class Entity<K> implements IEntity<K> {
  /**
   * Constructor base.
   * @param _id Identificador del item.
   */
  constructor(private _id: K) {}

  /**
   * Identificador del item.
   */
  public get id(): K {
    return this._id;
  }

  /**
   * Version de la entidad.
   */
  public version: number;

  /**
   * Compara si el item es igual a otro especificado por parámetro.
   * @param item Item a comparar.
   */
  public equals(item: IEntity<K>): boolean {
    return bcrypt.compareSync(this.getReference(), item.getHashcode());
  }

  /**
   * Genera un hashcode para el item.
   */
  public getHashcode() {
    return bcrypt.hashSync(this.getReference(), 5);
  }

  /**
   * Genera un identificador de referencia para el item.
   */
  public getReference(): string {
    return this.constructor.name + this._id;
  }
}
