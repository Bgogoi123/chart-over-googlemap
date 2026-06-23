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
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel
        id="disease_chip"
        sx={{ px: "0.5rem", backgroundColor: "#fff" }}
      >
        Select Disease
      </InputLabel>
      <Select
        labelId="disease-chip"
        id="multiple-disease-chip"
        multiple
        value={selectedDisease}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-disease-chip" label="Chip" />}
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
  );
}

export default MultiSelect;
