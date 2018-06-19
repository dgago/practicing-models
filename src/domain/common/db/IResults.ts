export interface IResults<T> {
  count: number;
  pageIndex: number;
  pageSize: number;
  items: T[];
}
