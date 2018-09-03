import { ArgumentError } from "../errors/argument.error";

export class DomainService {
  public notFalsy(item: any, name: string = null) {
    if (!item) {
      const message = name
        ? `El argumento ${name} debe tener un valor.`
        : `El argumento debe tener un valor.`;
      throw new ArgumentError(message);
    }
  }
}
