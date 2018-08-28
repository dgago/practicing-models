import { IStore } from "../../domain/core/data/store";
import { IIdentificable } from "../common/models/identificable";
import { IFlow, IFlowable } from "../flows/models/flowinstance";

export class Document
  implements IIdentificable, IFlowable<Document>, IStorable<Document, string> {
  // public attributes
  public id: string;
  public name: string;

  public file: File;
  public versions: File[];

  // behaviors
  public flow: IFlow<Document>;
  public store: IStore<Document, string>;

  // private attributes
  private saved: boolean;

  // behavior setters
  public setFlowBehavior(flow: IFlow<Document>): void {
    this.flow = flow;
  }

  public setStoreBehavior(instance: IStore<Document, string>) {
    this.store = instance;
  }

  // public methods
  public save() {
    if (this.saved) {
      this.store.update(this.id, this);
    } else {
      this.store.create(this);
    }

    this.flow.raiseEvent("doc-saved", this);
  }

  public addVersion(file: File) {
    this.versions.push(this.file);
    this.file = file;

    this.flow.raiseEvent("doc-version-added", this);
  }
}
