import { Repo } from "../../core/data/repo";
import { AppService } from "../../core/services/app-service";
import { FlowInstance } from "../../flows/entities/flow/models/flow-instance.vo";
import { DocumentRoot } from "../entities/document/document.entity";
import { File } from "../entities/document/models/file.vo";
import { CreateDocumentCommand } from "./commands/create-document.cmd";
import { DocumentCommand } from "./commands/document.cmd";
import { UpdateDocumentCommand } from "./commands/update-document.cmd";
import { DocumentDomainService } from "./document.service";
import { FlowDomainService } from "./flow.service";
import { Process, ProcessDomainService } from "./process.service";
import { TenantDomainService, TenantRoot } from "./tenant.service";

export class DocumentApplicationService extends AppService {
  private _documentService: DocumentDomainService;
  private _processService: ProcessDomainService;
  private _tenantService: TenantDomainService;
  private _flowService: FlowDomainService;
  private _documentRepo: Repo<DocumentRoot, DocumentRoot, string>;

  /**
   * createDocument
   */
  public async createDocument(command: CreateDocumentCommand): Promise<string> {
    this.notFalsy(command, "command");

    const tenant: TenantRoot = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );
    this.notFalsy(tenant, "tenant");

    const file: File = await this._documentService.getFile(
      tenant,
      command.user,
      command.fileId
    );
    this.notFalsy(file, "file");

    const process: Process = await this._processService.getProcess(
      tenant,
      command.user,
      command.processId
    );
    this.notFalsy(process, "process");

    this._documentService.canCreateDocument(tenant, command.user, process);

    const flowInstance: FlowInstance = await this._flowService.createInstance(
      tenant,
      command.user,
      process.publishingFlowId
    );

    const item = new DocumentRoot(
      null,
      command.user.tenantId,
      command.user.username,
      command.name,
      file,
      command.source,
      command.processId,
      process.reviewUsername,
      process.approvalUsername,
      process.publishingUsername,
      command.comments,
      command.copies.slice(),
      flowInstance
    );

    const documentId = this._documentRepo.create(item);

    // TODO: publish events

    return documentId;
  }

  /**
   * updateDocument
   */
  public async updateDocument(command: UpdateDocumentCommand) {
    this.notFalsy(command, "command");

    const tenant: TenantRoot = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );
    this.notFalsy(tenant, "tenant");

    // TODO: y si no está subiendo un archivo nuevo?
    const file: File = await this._documentService.getFile(
      tenant,
      command.user,
      command.fileId
    );
    this.notFalsy(file, "file");

    const process: Process = await this._processService.getProcess(
      tenant,
      command.user,
      command.processId
    );
    this.notFalsy(process, "process");

    this._documentService.canUpdateDocument(tenant, command.user, process);

    const item = this._documentRepo.findOneSync(command.documentId);
    this.notFalsy(item, "item");

    item.update(
      command.user.username,
      command.name,
      file,
      command.source,
      command.processId,
      process.reviewUsername,
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
   * changeDocumentStatus
   */
  public async changeDocumentStatus(command: DocumentCommand) {
    this.notFalsy(command, "command");

    const tenant: TenantRoot = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );
    this.notFalsy(tenant, "tenant");

    const item = this._documentRepo.findOneSync(command.documentId);
    this.notFalsy(item, "item");

    this._flowService.canRaiseEvent(tenant, command.user, item.flow);

    item.changeStatus(command.user.username, command.status, command.comments);

    const res = this._documentRepo.update(command.documentId, item);

    // TODO: publish events

    return res;
  }
}
