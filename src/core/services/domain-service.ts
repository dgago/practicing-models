import { Entity } from "../entities/entity";

export class DomainService {
  public itemMustExist<K>(item: Entity<K>) {
    if (!item) {
      throw new Error(`El registro no existe.`);
    }
  }
}
