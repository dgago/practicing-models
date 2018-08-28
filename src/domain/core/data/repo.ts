import { Entity } from "../entities/entity";
import { IMapper } from "./mapper";
import { IStore } from "./store";

export class Repo<T extends Entity<K>, D extends Entity<K>, K> {
  protected _mapper: IMapper<T, D, K>;
  protected _store: IStore<D, K>;

  constructor(store: IStore<D, K>, mapper: IMapper<T, D, K>) {
    this._store = store;
    this._mapper = mapper;
  }

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

  public update(id: K, item: T): Promise<boolean> {
    const ritem = this._mapper.mapToData(item);
    return this._store.update(id, ritem);
  }

  public updateSync(id: K, item: T): void {
    const ritem = this._mapper.mapToData(item);
    return this._store.updateSync(id, ritem);
  }
}
