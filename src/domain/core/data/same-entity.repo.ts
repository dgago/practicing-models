import { Entity } from "../entities/entity";
import { Repo } from "./repo";

export class SameEntityRepo<T extends Entity<K>, K> extends Repo<T, T, K> {}
