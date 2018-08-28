import { DomainService } from "../../core/services/domain-service";
import { IDayStore } from "../data/month.store";
import { DayEntity } from "../entities/day.entity";
import { Appointment } from "../models/appointment.vo";
import { Note } from "../models/note.vo";
import { Task } from "../models/task.vo";

export class JournalDomainService extends DomainService {
  private _dayStore: IDayStore;

  constructor(dayRepository: IDayStore) {
    super();

    this._dayStore = dayRepository;
  }

  /**
   * createDay
   */
  public createDay(tenantId: string, date: Date, monthId: string) {
    const item = new DayEntity(tenantId, date, monthId);
    this._dayStore.create(item);
    /**
     * event? no, porque las entidades emiten eventos, no los servicios
     * lo que sí se puede hacer acá es ejecutar los eventos que la entidad
     * pudo haber ido lanzando a medida que realizaba las tareas encomendadas
     */
  }

  /**
   * addTaskToDay
   */
  public async addTaskToDay(tenantId: string, date: Date, taskDesc: string) {
    const id = DayEntity.getId(tenantId, date);
    const item = await this._dayStore.findOne(id);
    item.AddTask(taskDesc);
    this._dayStore.update(id, item);
  }

  /**
   * removeTaskFromDay
   */
  public async removeTaskFromDay(tenantId: string, date: Date, task: Task) {
    const id = DayEntity.getId(tenantId, date);
    const item = await this._dayStore.findOne(id);
    item.RemoveTask(task);
    this._dayStore.update(id, item);
  }

  /**
   * addNoteToDay
   */
  public async addNoteToDay(
    tenantId: string,
    date: Date,
    noteContents: string
  ) {
    const id = DayEntity.getId(tenantId, date);
    const item = await this._dayStore.findOne(id);
    item.AddNote(noteContents);
    this._dayStore.update(id, item);
  }

  /**
   * removeNoteFromDay
   */
  public async removeNoteFromDay(tenantId: string, date: Date, note: Note) {
    const id = DayEntity.getId(tenantId, date);
    const item = await this._dayStore.findOne(id);
    item.RemoveNote(note);
    this._dayStore.update(id, item);
  }

  /**
   * addAppointmentToDay
   */
  public async addAppointmentToDay(
    tenantId: string,
    date: Date,
    appointmentDesc: string,
    appointmentTime: Date
  ) {
    const id = DayEntity.getId(tenantId, date);
    const item = await this._dayStore.findOne(id);
    item.AddAppointment(appointmentDesc, appointmentTime);
    this._dayStore.update(id, item);
  }

  /**
   * removeAppointmentFromDay
   */
  public async removeAppointmentFromDay(
    tenantId: string,
    date: Date,
    appointment: Appointment
  ) {
    const id = DayEntity.getId(tenantId, date);
    const item = await this._dayStore.findOne(id);
    item.RemoveAppointment(appointment);
    this._dayStore.update(id, item);
  }
}
