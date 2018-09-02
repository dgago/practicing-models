import { DomainService } from "../../core/services/domain-service";
import { File } from "../entities/document/models/file.vo";
import { IPrincipal } from "./commands/create-document.command";
import { Tenant } from "./tenant.service";
import { Process } from "./process.service";

export class DocumentDomainService extends DomainService {
  /**
   * Obtiene la referencia a un archivo subido mediante upload.
   * @param filename Identificador del archivo subido mediante upload.
   */
  getFile(user: IPrincipal, tenantId: string, filename: string): Promise<File> {
    throw new Error("Method not implemented.");
  }

  /**
   * Determina si un usuario puede crear un documento.
   * @param tenant Inquilino de la cuenta.
   * @param user Usuario autenticado.
   */
  canCreateDocument(tenant: Tenant, user: IPrincipal, process: Process): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Determina si un usuario puede actualizar un documento.
   * @param tenant Inquilino de la cuenta.
   * @param user Usuario autenticado.
   */
  canUpdateDocument(tenant: Tenant, user: IPrincipal, process: Process): void {
    throw new Error("Method not implemented.");
  }
}
