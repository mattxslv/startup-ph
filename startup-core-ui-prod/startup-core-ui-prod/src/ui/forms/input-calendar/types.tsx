export interface IDate {
  date: string; // 'YYYY-MM-DD'
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
}
