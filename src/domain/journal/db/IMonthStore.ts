import { IStore } from "../../common/db/IStore";
import { DayEntity } from "../components/DayEntity";
import { MonthEntity } from "../components/MonthEntity";

export interface IMonthStore extends IStore<MonthEntity, string> {}

export interface IDayStore extends IStore<DayEntity, string> {}
