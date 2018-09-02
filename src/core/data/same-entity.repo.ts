import { Repo } from "./repo";
import { AggregateRoot } from "../entities/aggregate-root";

export class SameEntityRepo<T extends AggregateRoot<K>, K> extends Repo<
  T,
  T,
  K
> {}
