export interface IDataLabel {
  color?: string;
  formatter?: (v: number | string | null) => number | string | null;
}
