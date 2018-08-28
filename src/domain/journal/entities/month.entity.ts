import * as joi from "joi";
import * as _ from "lodash";
import { Entity } from "../../core/entities/entity";
import { Appointment } from "../models/appointment.vo";
import { Task, TaskStatus } from "../models/task.vo";

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
