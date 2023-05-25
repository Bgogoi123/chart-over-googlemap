export type TMultiSelectProps = {
  data: string[];
  selectedDisease: string[];
  setSelectedDisease: React.Dispatch<React.SetStateAction<string[]>>;
};

export type TDateScaleProps = {
  dates: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};
