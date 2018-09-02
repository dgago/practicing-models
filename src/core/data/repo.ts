import { Entity } from "../entities/entity";
import { IMapper } from "./mapper";
import { IStore } from "./store";
import { AggregateRoot } from "../entities/aggregate-root";

export class Repo<T extends AggregateRoot<K>, D extends Entity<K>, K> {
  constructor(
    protected _store: IStore<D, K>,
    protected _mapper: IMapper<T, D, K>
  ) {}

  public async findOne(id: K): Promise<T> {
    const item = await this._store.findOne(id);
    if (!item) {
      return null;
    }

    return this._mapper.mapToDomain(item);
  }

  public findOneSync(id: K): T {
    const item = this._store.findOneSync(id);
    if (!item) {
      return null;
    }

    return this._mapper.mapToDomain(item);
  }

  public findOneData(id: K): Promise<D> {
    return this._store.findOne(id);
  }

  public findOneDataSync(id: K): D {
    return this._store.findOneSync(id);
  }

  /**
   * create
   */
  public create(item: T): Promise<K> {
    const ritem = this._mapper.mapToData(item);
    return this._store.create(ritem);
  }

  /**
   * createSync
   */
  public createSync(item: T): K {
    const ritem = this._mapper.mapToData(item);
    return this._store.createSync(ritem);
  }

  public async update(id: K, item: T): Promise<boolean> {
    const ditem = await this._store.findOne(id);
    if (ditem.version > item.version) {
      throw new Error(
        `El registro a actualizar está obsoleto: ${item.getReference()}.`
      );
    }

    const ritem = this._mapper.mapToData(item);
    return this._store.update(id, ritem);
  }

  public updateSync(id: K, item: T): void {
    const ditem = this._store.findOneSync(id);
    if (ditem.version > item.version) {
      throw new Error(
        `El registro a actualizar está obsoleto: ${item.getReference()}.`
      );
    }

    const ritem = this._mapper.mapToData(item);
    return this._store.updateSync(id, ritem);
  }
}
