export type TMultiSelectProps = {
  data: string[];
  selectedData: string[];
  label: string;
  onSelect?: (value: string[]) => void;
};

export type TDateScaleProps = {
  dates: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};
