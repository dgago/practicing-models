import { Entity } from "../entities/entity";

export interface IMapper<T extends Entity<K>, D extends Entity<K>, K> {
  mapToData(item: T): D;
  mapToDomain(item: D): T;
}

export class Mapper<T extends Entity<K>, K> implements IMapper<T, T, K> {
  public mapToData(item: T): T {
    return item;
  }

  public mapToDomain(item: T): T {
    return item;
  }
}
