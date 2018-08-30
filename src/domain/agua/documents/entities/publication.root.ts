import * as joi from "joi";
import { Root } from "../../../core/entities/root";
import { Document, DocumentStatus } from "./document.entity";
import { DocumentModified } from "./events/document-modified.event";

export class Publication extends Root {
  /**
   * publish
   */
  public publish(item: Document): DocumentModified {
    joi.assert(item, joi.required());

    item.publish();

    return new DocumentModified({
      documentId: item.id,
      status: DocumentStatus.Published
    });
  }
}
