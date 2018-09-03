import { Repo } from "../../core/data/repo";
import { AppService } from "../../core/services/app-service";
import { FlowRoot } from "../../flows/entities/flow/flow.entity";
import { DocumentRoot } from "../entities/document/document.entity";
import { FlowCommand } from "./commands/flow.cmd";
import { FlowDomainService } from "./flow.service";
import { TenantRoot, TenantDomainService } from "./tenant.service";

export class FlowApplicationService extends AppService {
  private _tenantService: TenantDomainService;
  private _flowService: FlowDomainService;
  private _flowRepo: Repo<FlowRoot, DocumentRoot, string>;

  /**
   * Lanza un evento para un flujo.
   */
  public async raiseEvent(command: FlowCommand): Promise<string> {
    // TODO: qué pasa si el usuario tiene varios alquileres?
    // TODO: no debería especificar cuál de ellos utilizar?
    const tenant: TenantRoot = await this._tenantService.getTenant(
      command.user,
      command.user.tenantId
    );

    const flow = await this._flowRepo.findOne(command.flowId);
    this._flowService.notFalsy(flow);

    const res = flow.raiseEvent(
      tenant,
      command.user,
      command.instanceId,
      command.data
    );

    // TODO: publish events

    return res;
  }
}
