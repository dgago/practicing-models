import { Entity } from "../entities/entity";

export interface IStore<T extends Entity<K>, K> {
  // async methods
  findOne(id: K): Promise<T>;
  find(q?: any): Promise<IResults<T>>;
  find(take: number, pageIndex: number, pageSize?: any): Promise<IResults<T>>;
  find(
    q: any,
    take: number,
    pageIndex: number,
    pageSize?: any
  ): Promise<IResults<T>>;
  exists(q?: any): Promise<boolean>;

  create(item: T): Promise<K>;
  update(id: K, item: T): Promise<boolean>;
  delete(id: K): Promise<boolean>;

  // sync methods
  findOneSync(id: K): T;
  findSync(q?: any): IResults<T>;
  findSync(take: number, pageIndex: number, pageSize?: any): IResults<T>;
  findSync(
    q: any,
    take: number,
    pageIndex: number,
    pageSize?: any
  ): IResults<T>;
  existsSync(q?: any): boolean;

  createSync(item: T): K;
  updateSync(id: K, item: T): void;
  deleteSync(id: K): void;
}

export interface IResults<T> {
  count: number;
  pageIndex: number;
  pageSize: number;
  items: T[];
}
