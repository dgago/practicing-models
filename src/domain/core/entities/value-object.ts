import * as _ from "lodash";

export class ValueObject {
  public equals(item: ValueObject): boolean {
    return _.isEqual(this, item);
  }
}
