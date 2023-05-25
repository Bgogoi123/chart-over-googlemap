import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TMultiSelectProps } from "../../types/props";

function MultiSelect({
  data,
  selectedDisease,
  setSelectedDisease,
}: TMultiSelectProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedDisease(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{ padding: "0.5em 0 0.5em 0" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="disease_chip">Disease</InputLabel>
        <Select
          labelId="disease-chip"
          id="multiple-disease-chip"
          multiple
          value={selectedDisease}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-disease-chip" label="Chip" />
          }
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {data.map((datum) => (
            <MenuItem key={datum} value={datum}>
              {datum}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultiSelect;
