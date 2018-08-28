import { IStore } from "../../core/data/store";
import { DayEntity } from "../entities/day.entity";
import { MonthEntity } from "../entities/month.entity";

export interface IMonthStore extends IStore<MonthEntity, string> {}

export interface IDayStore extends IStore<DayEntity, string> {}
