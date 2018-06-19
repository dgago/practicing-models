import { IResults } from "./IResults";
import { Entity } from "../components/Entity";

export interface IStore<T extends Entity<K>, K> {
  // async methods
  findOne(id: K): Promise<T>;
  find(): Promise<IResults<T>>;
  find(q: any): Promise<IResults<T>>;
  create(item: T): Promise<K>;
  update(id: K, item: T): Promise<boolean>;
  delete(id: K): Promise<boolean>;

  // sync methods
  findOneSync(id: K): T;
  findSync(): IResults<T>;
  findSync(q: any): IResults<T>;
  createSync(item: T): K;
  updateSync(id: K, item: T): void;
  deleteSync(id: K): void;
}
