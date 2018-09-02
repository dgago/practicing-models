import * as _ from "lodash";

/**
 * ValueObject.
 */
export class ValueObject {
  /**
   * Compara si el item es igual a otro especificado por parámetro.
   * @param item Item a comparar.
   */
  public equals(item: ValueObject): boolean {
    return _.isEqual(this, item);
  }
}
