import * as joi from "joi";
import * as _ from "lodash";
import { Entity } from "../../common/components/Entity";
import { Appointment } from "../models/Appointment";
import { Task, TaskStatus } from "../models/Task";

export class MonthEntity extends Entity<string> {
  /**
   * getId
   */
  public static getId(tenantId: string, date: Date) {
    return `${tenantId}${date.getDate()}`;
  }

  private _appointments: Appointment[];
  private _tasks: Task[];

}
