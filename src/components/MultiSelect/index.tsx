import { useState } from "react";
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
  selectedData,
  label,
  onSelect,
}: TMultiSelectProps) {
  const [values, setValues] = useState<typeof selectedData>(selectedData);
  const labelId = label.toLowerCase().trim().replaceAll(" ","-")

  function handleChange(event: SelectChangeEvent<string[]>) {
    const val = event.target.value;

    let names: string[] | null = null;
    if (typeof val === "string") names = val.split(",");
    else names = val;

    setValues(names);
    onSelect?.(names);
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      {label && (
        <InputLabel
          id={`${labelId}_chip`}
          sx={{ px: "0.5rem", backgroundColor: "#fff" }}
        >
          {label}
        </InputLabel>
      )}

      <Select
        labelId={`${labelId}_chip`}
        id={`multiple-${labelId}-chip`}
        multiple
        value={values}
        onChange={handleChange}
        input={<OutlinedInput id={`${labelId}-chip-input`} label="Chip" />}
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
