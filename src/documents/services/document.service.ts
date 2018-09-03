import { DomainService } from "../../core/services/domain-service";
import { File } from "../entities/document/models/file.vo";
import { IPrincipal } from "./commands/principal";
import { Process } from "./process.service";
import { TenantRoot } from "./tenant.service";

export class DocumentDomainService extends DomainService {
  /**
   * Obtiene la referencia a un archivo subido mediante upload.
   * @param filename Identificador del archivo subido mediante upload.
   */
  getFile(
    tenant: TenantRoot,
    user: IPrincipal,
    filename: string
  ): Promise<File> {
    throw new Error("Method not implemented.");
  }

  /**
   * Determina si un usuario puede crear un documento.
   * @param tenant Inquilino de la cuenta.
   * @param user Usuario autenticado.
   * @param process Proceso asociado al documento.
   */
  canCreateDocument(
    tenant: TenantRoot,
    user: IPrincipal,
    process: Process
  ): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Determina si un usuario puede actualizar un documento.
   * @param tenant Inquilino de la cuenta.
   * @param user Usuario autenticado.
   * @param process Proceso asociado al documento.
   */
  canUpdateDocument(
    tenant: TenantRoot,
    user: IPrincipal,
    process: Process
  ): void {
    throw new Error("Method not implemented.");
  }
}
