import { DomainService } from "../../common/services/DomainService";
import { IMonthStore, IDayStore } from "../db/IMonthStore";
import { DayEntity } from "../components/DayEntity";

export class JournalDomainService extends DomainService {
  private _monthStore: IMonthStore;
  private _dayStore: IDayStore;

  constructor(
    monthRepository: IMonthStore,
    dayRepository: IDayStore
  ) {
    super();

    this._monthStore = monthRepository;
    this._dayStore = dayRepository;
  }

  /**
   * createDay
   */
  public createDay(tenantId: string, date: Date, monthId: string) {
    const item = new DayEntity(tenantId, date, monthId);
    this._dayStore.create(item);
    // event?
  }
}
