import { DomainEvent } from "../../core/events/domain-event.vo";
import { DocumentRoot } from "../entities/document/document.entity";

export class DocumentModifiedEvent extends DomainEvent {
  /**
   * Constructor
   */
  constructor(private _document: DocumentRoot, date: Date = new Date()) {
    super(date);
  }

  /**
   * document
   */
  public get document(): DocumentRoot {
    return this._document;
  }
}
