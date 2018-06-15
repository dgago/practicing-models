import { IResults } from "./results";

export interface IStore<T, K> {
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

/**
 * Behavior interface for methods
 */
export interface IStorable<T, K> {
  store: IStore<T, K>;
}
