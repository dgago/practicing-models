import { Repo } from "../../core/data/repo";
import { AppService } from "../../core/services/app-service";
import { DocumentRoot } from "../entities/document/document.entity";
import { File } from "../entities/document/models/file.vo";
import { CreateDocumentCommand } from "./commands/create-document.command";
import { DocumentCommand } from "./commands/document-command";
import { UpdateDocumentCommand } from "./commands/update-document.command";
import { DocumentDomainService } from "./document.service";
import { Process, ProcessDomainService } from "./process.service";
import { Tenant, TenantDomainService } from "./tenant.service";

export class DocumentApplicationService extends AppService {
  private _documentService: DocumentDomainService;
  private _processService: ProcessDomainService;
  private _tenantService: TenantDomainService;
  private _documentRepo: Repo<DocumentRoot, DocumentRoot, string>;

  /**
   * createDocument
   */
  public async createDocument(command: CreateDocumentCommand): Promise<string> {
    const tenant: Tenant = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );

    const file: File = await this._documentService.getFile(
      command.user,
      command.user.tenantId,
      command.fileId
    );

    const process: Process = await this._processService.getProcess(
      command.user,
      command.user.tenantId,
      command.processId
    );

    this._documentService.canCreateDocument(tenant, command.user, process);

    const item = new DocumentRoot(
      null,
      command.user.tenantId,
      command.user.username,
      command.name,
      file,
      command.source,
      command.processId,
      process.revisionUsername,
      process.approvalUsername,
      process.publishingUsername,
      process.comments,
      process.copies.slice()
    );

    const documentId = this._documentRepo.create(item);

    // TODO: publish events

    return documentId;
  }

  /**
   * updateDocument
   */
  public async updateDocument(command: UpdateDocumentCommand) {
    const tenant: Tenant = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );

    const file: File = await this._documentService.getFile(
      command.user,
      command.user.tenantId,
      command.fileId
    );

    const process: Process = await this._processService.getProcess(
      command.user,
      command.user.tenantId,
      command.processId
    );

    this._documentService.canUpdateDocument(tenant, command.user, process);

    const item = this._documentRepo.findOneSync(command.documentId);
    this._documentService.itemMustExist(item);

    item.update(
      command.user.username,
      command.name,
      file,
      command.source,
      command.processId,
      process.revisionUsername,
      process.approvalUsername,
      process.publishingUsername,
      command.comments,
      command.copies.slice()
    );

    const res = this._documentRepo.update(command.documentId, item);

    // TODO: publish events

    return res;
  }

  /**
   * publishDocument
   */
  public async publishDocument(command: DocumentCommand) {
    const tenant: Tenant = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );

    const item = this._documentRepo.findOneSync(command.documentId);
    this._documentService.itemMustExist(item);

    const process: Process = await this._processService.getProcess(
      command.user,
      command.user.tenantId,
      item.processId
    );

    // TODO: verificar si es neceario el proceso, para no obtener el documento
    // antes de chequear si el usuario puede publicarlo.
    this._documentService.canPublishDocument(tenant, command.user, process);

    item.publish(command.user.username);

    const res = this._documentRepo.update(command.documentId, item);

    // TODO: publish events

    return res;
  }
}
