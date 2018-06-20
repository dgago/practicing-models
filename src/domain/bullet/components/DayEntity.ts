import * as _ from "lodash";
import { Entity } from "../../common/components/Entity";
import { Appointment } from "../models/Appointment";
import { Note } from "../models/Note";
import { Task, TaskStatus } from "../models/Task";

export class DayEntity extends Entity<string> {
  private _tasks: Task[];
  private _appointments: Appointment[];
  private _notes: Note[];
  private _date: Date;
  private _monthId: string;

  /**
   * AddTask
   */
  public AddTask(desc: string): Task {
    const item = new Task(desc, TaskStatus.Pending);
    this._tasks.push(item);
    return item;
  }

  /**
   * RemoveTask
   */
  public RemoveTask(item: Task): void {
    _.remove(this._tasks, item);
  }

  /**
   * AddNote
   */
  public AddNote(contents: string): Note {
    const item = new Note(contents);
    this._notes.push(item);
    return item;
  }

  /**
   * RemoveNote
   */
  public RemoveNote(item: Note): void {
    _.remove(this._notes, item);
  }

  /**
   * AddAppointment
   */
  public AddAppointment(desc: string, time: Date): Appointment {
    const item = new Appointment(desc, time);
    this._appointments.push(item);
    return item;
  }

  /**
   * RemoveAppointment
   */
  public RemoveAppointment(item: Appointment): void {
    _.remove(this._appointments, item);
  }
}
