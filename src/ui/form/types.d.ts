type TSelectOption = {
  label: string;
  value: string | number;
};

type TPager = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
};
