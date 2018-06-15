import { IIdentificable } from "../../common/models/identificable";

export class File implements IIdentificable {
  public id: string;
  public name: string;
  public contentType: string;
  public provider: string;
  public length: number;
  public pages?: number;
}

export interface IFileProvider {
  
}
