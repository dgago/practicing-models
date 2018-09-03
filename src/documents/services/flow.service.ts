import { Repo } from "../../core/data/repo";
import { ArgumentError } from "../../core/errors/argument.error";
import { AuthError } from "../../core/errors/auth.error";
import { DomainService } from "../../core/services/domain-service";
import { FlowRoot } from "../../flows/entities/flow/flow.entity";
import { FlowInstance } from "../../flows/entities/flow/models/flow-instance.vo";
import { FlowState } from "../../flows/entities/flow/models/flow-state.vo";
import { DocumentRoot } from "../entities/document/document.entity";
import { IPrincipal } from "./commands/principal";
import { TenantRoot } from "./tenant.service";

export class FlowDomainService extends DomainService {
  private _flowRepo: Repo<FlowRoot, DocumentRoot, string>;

  /**
   * Crea una instancia de un workflow.
   *
   * @param tenant Empresa que alquila el software
   * @param user Usuario autenticado
   * @param flowId Identificador del workflow para el que se debe crear la instancia
   */
  public async createInstance(
    tenant: TenantRoot,
    user: IPrincipal,
    flowId: string
  ): Promise<FlowInstance> {
    this.notFalsy(tenant, "tenant");
    this.notFalsy(user, "user");
    this.notFalsy(flowId, "flowId");

    const flow = await this._flowRepo.findOne(flowId);
    this.notFalsy(flow);
    this.tenantIsOwner(flow, tenant);

    const state = this.stateExists(flow, flow.initial);
    this.userCanRaiseEvent(state, user);

    return new FlowInstance(flow.id, flow.initial);
  }

  /**
   * Evalúa si un usuario tiene permisos para lanzar un evento sobre una
   * instancia.
   *
   * @param tenant Empresa que alquila el software
   * @param user Usuario autenticado
   * @param flowInstance Instancia a evaluar
   */
  public async canRaiseEvent(
    tenant: TenantRoot,
    user: IPrincipal,
    flowInstance: FlowInstance
  ): Promise<void> {
    this.notFalsy(tenant, "tenant");
    this.notFalsy(user, "user");
    this.notFalsy(flowInstance, "flowInstance");

    const flow = await this._flowRepo.findOne(flowInstance.flowId);
    this.notFalsy(flow);
    this.tenantIsOwner(flow, tenant);

    const state: FlowState = this.stateExists(flow, flowInstance.state);
    this.userCanRaiseEvent(state, user);
  }

  private userCanRaiseEvent(state: FlowState, user: IPrincipal) {
    const any = state.roles.some((x) => user.roles.indexOf(x) >= 0);
    if (!any) {
      throw new AuthError(
        `El usuario no tiene permisos para continuar la instancia`
      );
    }
  }

  private stateExists(flow: FlowRoot, stateName: string) {
    const states = flow.states.filter((x) => x.name === stateName);
    if (states.length < 1) {
      throw new ArgumentError(
        `La instancia no pertenece al estado ${stateName}`
      );
    }
    const state: FlowState = states[0];
    return state;
  }

  private tenantIsOwner(flow: FlowRoot, tenant: TenantRoot) {
    if (flow.tenantId !== tenant.id) {
      throw new ArgumentError(
        `La instancia no pertenece a la empresa ${tenant.name}`
      );
    }
  }
}
