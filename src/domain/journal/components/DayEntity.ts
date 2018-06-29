import * as joi from "joi";
import * as _ from "lodash";
import { Entity } from "../../common/components/Entity";
import { Appointment } from "../models/Appointment";
import { Note } from "../models/Note";
import { Task, TaskStatus } from "../models/Task";

export class DayEntity extends Entity<string> {
  /**
   * getId
   */
  public static getId(tenantId: string, date: Date) {
    return `${tenantId}${date.getDate()}`;
  }

  private _tasks: Task[];
  private _appointments: Appointment[];
  private _notes: Note[];

  /**
   * Constructor
   */
  constructor(tenantId: string, date: Date, monthId: string) {
    super(null);

    joi.assert(tenantId, joi.string().required());
    joi.assert(date, joi.date().required());
    joi.assert(monthId, joi.string().required());

    this._tenantId = tenantId;
    this._date = date;
    this._monthId = monthId;
  }

  /**
   * TenantId
   */
  private _tenantId: string;
  public get tenantId(): string {
    return this._tenantId;
  }
  // public set tenantId(v : string) {
  //   this._tenantId = v;
  // }

  /**
   * Date
   */
  private _date: Date;
  public get date(): Date {
    return this._date;
  }
  // public set date(v : Date) {
  //   this._date = v;
  // }

  /**
   * MonthId
   */
  private _monthId: string;
  public get monthId(): string {
    return this._monthId;
  }
  public set monthId(v: string) {
    /* TODO: Regex para monthId */
    joi.assert(v, joi.string().required());

    this._monthId = v;
  }

  /**
   * AddTask
   */
  public AddTask(desc: string): Task {
    joi.assert(desc, joi.string().required());

    const item = new Task(desc, TaskStatus.Pending);
    this._tasks.push(item);
    return item;
  }

  /**
   * RemoveTask
   */
  public RemoveTask(item: Task): void {
    joi.assert(item, joi.required());

    _.remove(this._tasks, item);
  }

  /**
   * AddNote
   */
  public AddNote(contents: string): Note {
    joi.assert(contents, joi.string().required());

    const item = new Note(contents);
    this._notes.push(item);
    return item;
  }

  /**
   * RemoveNote
   */
  public RemoveNote(item: Note): void {
    joi.assert(item, joi.required());

    _.remove(this._notes, item);
  }

  /**
   * AddAppointment
   */
  public AddAppointment(desc: string, time: Date): Appointment {
    joi.assert(desc, joi.string().required());
    joi.assert(
      time,
      joi
        .date()
        .min(_.now())
        .required()
    );

    const item = new Appointment(desc, time);
    this._appointments.push(item);
    return item;
  }

  /**
   * RemoveAppointment
   */
  public RemoveAppointment(item: Appointment): void {
    joi.assert(item, joi.required());

    _.remove(this._appointments, item);
  }
}
