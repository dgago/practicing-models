export interface IDashboard {
  Title: string;
  Items: IDashboardItem[];
}

export interface IDashboardItem {
  Title: string;
  Resource: string;
  Type: DashboardItemType;
  Enabled: boolean;
  Config: string;
}

export enum DashboardItemType {
  Table = 1,
  Pie = 2,
  Bar = 3,
  Line = 4,
  Gauge = 5,
  Column = 6
}

export interface IReport {
  Id: string;
  Resource: string;
  Params: string[];
}
